/*
    Represents a single beat within a bar of music in the editor.
*/

class Beat {

    constructor(bar) {
        this.bar = bar;
        this.notes = [];
        this.isRest = false;
        this.el = document.createElement('div');
        this.length = this.getEditor().cursor.currentLength;
        this.lengthEl = document.createElement('div');
        this.lengthEl.className = 'length';
        this.setLength(this.length)
        this.el.appendChild(this.lengthEl);
        for (let i = 0; i < 6; i++) {
            const note = new Note(this, i, '');
            this.notes.push(note);
            this.el.appendChild(note.el);
        }
    }

    setNote(line, value) {
        if (value == 'r') {
            this.isRest = true;
            this.notes.forEach(note => note.setValue(''));
        } else {
            this.isRest = false;
            this.notes[line].setValue(value);
        }
        this.setLength(this.length);
    }

    getEditor() {
        return this.bar.getEditor();
    }

    setLength(length) {
        this.length = length;
        if (this.isRest) {
            this.lengthEl.innerText = RESTS[this.length];
        } else {
            this.lengthEl.innerText = LENGTHS[this.length];
        }
        this.lengthEl.title = LENGTH_NAMES[this.length];
        this.el.className = 'beat ' + LENGTHS[this.length];
        this.bar.updateLength();
    }

    isEmpty() {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].value) {
                return false;
            }
        }
        return !this.isRest;
    }

    delete() {
        const bar = this.bar;
        if (this.el != null) {
            bar.el.removeChild(this.el);
            bar.beats.splice(bar.beats.indexOf(this), 1);
        }
        this.el = null;
        bar.updateLength();
        if (bar.beats.length == 0) {
            bar.delete();
        }
    }

}
