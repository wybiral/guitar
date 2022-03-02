/*
    Represents a single note within a beat of music.
*/

class Note {

    constructor(beat, line, value) {
        this.beat = beat;
        this.line = line;
        this.value = value;
        this.el = document.createElement('div');
        this.el.className = 'note';
        this.stringEl = document.createElement('div');
        this.stringEl.className = 'string';
        this.el.appendChild(this.stringEl);
        this.containerEl = document.createElement('div');
        this.containerEl.className = 'container';
        this.el.appendChild(this.containerEl);
        this.valueEl = document.createElement('div');
        this.valueEl.className = 'value';
        this.valueEl.innerText = value;
        this.containerEl.appendChild(this.valueEl);
        this.containerEl.onclick = evt => {
            this.getEditor().cursor.setAt(this.beat, this.line);
        };
    }

    setValue(value) {
        this.value = value;
        this.valueEl.innerText = value;
    }

    getEditor() {
        return this.beat.getEditor();
    }

}
