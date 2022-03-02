window.onload = () => {
    const editor = new Editor();
    document.querySelector('main').appendChild(editor.el);

    // create length buttons
    const lengthButtons = [];
    for (let i = 0; i < LENGTHS.length; i++) {
        const el = document.createElement('button');
        el.innerText = LENGTHS[i];
        document.querySelector('#lengths').appendChild(el);
        lengthButtons.push(el);
        el.onmousedown = evt => {
            // prevent the button from stealing focus
            evt.preventDefault();
            if (editor.cursor.active) {
                editor.cursor.currentBeat.setLength(i);
            }
            editor.cursor.setLength(i);
        };
    }
    lengthButtons[editor.cursor.currentLength].className = 'current';
    editor.addEventListener('lengthchange', evt => {
        lengthButtons[evt.detail.previousLength].className = '';
        lengthButtons[evt.detail.currentLength].className = 'current';
    });

    // create play button
    const playEl = document.querySelector('#play');
    playEl.onclick = evt => {
        if (editor.playing) {
            editor.dispatchEvent('playbackstop');
        } else {
            editor.dispatchEvent('playbackstart');
        }
    };
    editor.addEventListener('playbackstart', evt => {
        playEl.innerText = 'Stop';
    });
    editor.addEventListener('playbackstop', evt => {
        playEl.innerText = 'Play';
    });
    window.addEventListener('keydown', evt => {
        if (evt.key == ' ') {
            if (editor.playing) {
                editor.dispatchEvent('playbackstop');
            } else {
                editor.dispatchEvent('playbackstart');
            }
        }
    });

};
