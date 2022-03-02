/*
    Represents a single musical bar in the editor.
*/

class Bar {

    constructor(track) {
        this.track = track;
        this.beats = [];
        this.length = 0;
        this.setTimeSignature(4, 4);
        this.tempo = 120;
        this.el = document.createElement('div');
        this.el.className = 'bar';
        this.addBeat();
    }

    setTimeSignature(upper, lower) {
        this.signature = [upper, lower];
        this.maxLength = Math.floor((upper / lower) * 128);
    }

    addBeat() {
        const beat = new Beat(this);
        this.beats.push(beat);
        this.el.appendChild(beat.el);
        this.updateLength();
        return beat;
    }

    getEditor() {
        return this.track.getEditor();
    }

    updateLength() {
        this.length = 0;
        for (let i = 0; i < this.beats.length; i++) {
            this.length += LENGTH_VALUES[this.beats[i].length];
        }
        if (this.length < this.maxLength) {
            this.el.className = 'bar under';
        } else if (this.length > this.maxLength) {
            this.el.className = 'bar over';
        } else {
            this.el.className = 'bar';
        }
    }

    incomplete() {
        return this.length < this.maxLength;
    }

    delete() {
        const track = this.track;
        track.el.removeChild(this.el);
        track.bars.splice(track.bars.indexOf(this), 1);
    }

}
