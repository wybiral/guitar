/*
    Handles the editor cursor behavior.
*/

class Cursor {

    constructor(editor) {
        this.editor = editor;
        this.active = false;
        this.currentBeat = null;
        this.currentLine = 0;
        this.currentLength = 2;
        this.previousBeat = null;
        this.inputEl = document.createElement('input');
        this.inputEl.maxLength = 2;
        this.attachListeners();
    }

    attachListeners() {
        const input = this.inputEl;
        input.onclick = evt => {
            evt.stopPropagation();
        };
        input.onkeydown = evt => {
            if (!this.active) {
                evt.preventDefault();
                evt.stopPropagation();
                return;
            }
            if ('0123456789'.indexOf(evt.key) >= 0) {
                return;
            }
            if (evt.key == ' ') {
                evt.preventDefault();
                return;
            }
            evt.preventDefault();
            evt.stopPropagation();
            const currentBeat = this.currentBeat;
            if (evt.key == 'r') {
                input.value = '';
                currentBeat.setNote(null, 'r');
            } else if (evt.key == 'ArrowUp') {
                this.moveUp();
            } else if (evt.key == 'ArrowDown') {
                this.moveDown();
            } else if (evt.key == 'ArrowLeft') {
                this.moveLeft();
            } else if (evt.key == 'ArrowRight' || evt.key == 'Tab') {
                this.moveRight();
            } else if (evt.key == 'Backspace') {
                if (input.value.length) {
                    // input isn't empty, so empty it
                    input.value = '';
                    currentBeat.setNote(this.currentLine, '');
                } else {
                    // input is empty, try to delete current beat
                    if (currentBeat.isEmpty() || currentBeat.isRest) {
                        this.moveLeft();
                        // if we couldn't move left, don't delete it
                        if (this.currentBeat !== currentBeat) {
                            currentBeat.delete();
                        }
                    }
                }
            } else if (evt.key == 'i' || evt.key == 'Insert') {
                const bar = currentBeat.bar;
                const newBeat = new Beat(bar);
                bar.beats.splice(bar.beats.indexOf(currentBeat), 0, newBeat);
                bar.el.insertBefore(newBeat.el, currentBeat.el);
                bar.updateLength();
                this.moveLeft();
            }
        };
        input.oninput = evt => {
            const beat = this.currentBeat;
            const value = evt.target.value;
            if (!beat.isRest) {
                // update a normal note
                beat.setNote(this.currentLine, value);
            } else if (beat.isRest && value) {
                // turn a rest beat into a normal note
                beat.setNote(this.currentLine, value);
            }
            // play current beat
            const instrument = this.editor.track.instrument;
            this.editor.playBeat(instrument, beat);
        };
        input.onblur = evt => {
            this.active = false;
            this.inputEl.parentNode.removeChild(this.inputEl);
            setTimeout(() => {
                let beat = this.previousBeat;
                if (this.inputEl.parentNode === null) {
                    // this happens when focus is lost from clicking away
                    beat = this.currentBeat;
                } else if(this.currentBeat == this.previousBeat) {
                    // don't remove the bar if the cursor is still there
                    return;
                }
                if (beat && beat.isEmpty() && !beat.isRest) {
                    // this beat is empty now
                    if (beat.bar.beats.length > 1) {
                        // delete it unless it's the only beat in a bar
                        beat.delete();
                    }
                }
            }, 0);
        };
    }

    setLength(length) {
        if (this.currentLength != length) {
            this.editor.dispatchEvent('lengthchange', {
                previousLength: this.currentLength,
                currentLength: length
            });
            this.currentLength = length;
        }
    }

    setAt(beat, line) {
        const note = beat.notes[line];
        this.previousBeat = this.currentBeat;
        this.currentBeat = beat;
        this.currentLine = line;
        this.setLength(this.currentBeat.length);
        this.inputEl.value = note.value;
        note.el.appendChild(this.inputEl);
        this.active = true;
        setTimeout(() => {
            this.inputEl.focus();
            this.inputEl.select();
        }, 0);
    }

    moveUp() {
        this.inputEl.blur();
        let line = this.currentLine - 1;
        if (line < 0) {
            line = this.currentBeat.notes.length - 1;
        }
        this.setAt(this.currentBeat, line);
    }

    moveDown() {
        this.inputEl.blur();
        let line = this.currentLine + 1;
        if (line >= this.currentBeat.notes.length) {
            line = 0;
        }
        this.setAt(this.currentBeat, line);
    }

    moveLeft() {
        this.inputEl.blur();
        let beat = this.currentBeat;
        let bar = beat.bar;
        let track = bar.track;
        let index = bar.beats.indexOf(beat) - 1;
        if (index < 0) {
            let barindex = track.bars.indexOf(bar) - 1;
            if (barindex >= 0) {
                bar = track.bars[barindex];
                index = bar.beats.length - 1;
            } else {
                // can't move left any further
                index = 0;
            }
        }
        this.setAt(bar.beats[index], this.currentLine);
    }

    moveRight() {
        this.inputEl.blur();
        let beat = this.currentBeat;
        let bar = beat.bar;
        let track = bar.track;
        let index = bar.beats.indexOf(beat) + 1;
        if (beat.isEmpty() && !(bar.beats[index])) {
            // let the user skip to the next bar
            let barindex = track.bars.indexOf(bar) + 1;
            if (barindex == track.bars.length) {
                track.addBar();
            }
            bar = track.bars[barindex];
            index = 0;
        } else if (index == bar.beats.length) {
            if (bar.incomplete()) {
                bar.addBeat();
            } else {
                let barindex = track.bars.indexOf(bar) + 1;
                if (barindex == track.bars.length) {
                    track.addBar();
                }
                bar = track.bars[barindex];
                index = 0;
            }
        }
        this.setAt(bar.beats[index], this.currentLine);
    }

}
