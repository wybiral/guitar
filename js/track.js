/*
    Represents a single-instrument track of music in the editor.
*/

class Track {

    constructor(editor) {
        this.editor = editor;
        this.instrument = new Instrument();
        this.bars = [];
        this.el = document.createElement('div');
        this.el.className = 'track';
        this.addBar();
    }

    addBar() {
        const bar = new Bar(this);
        this.bars.push(bar);
        this.el.appendChild(bar.el);
        return bar;
    }

    getEditor() {
        return this.editor;
    }

}