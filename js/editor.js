/*
    Handles everything related to the main tab editor.
*/

const LENGTHS = ['𝅝', '𝅗𝅥', '𝅘𝅥', '𝅘𝅥𝅮', '𝅘𝅥𝅯', '𝅘𝅥𝅰', '𝅘𝅥𝅱', '𝅘𝅥𝅲'];

const RESTS = ['𝄻', '𝄼', '𝄽', '𝄾', '𝄿', '𝅀', '𝅁', '𝅂'];

const LENGTH_NAMES = [
    'Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth',
    'Thirty-second', 'Sixty-fourth', 'Hundred twenty-eighth'
];

const LENGTH_VALUES = [128, 64, 32, 16, 8, 4, 2, 1];


class Editor {

    constructor() {
        this.playing = false;
        this.audio = new Audio();
        this.audio.setGain(1.0);
        this.cursor = new Cursor(this);
        this.track = new Track(this);
        this.el = document.createElement('div');
        this.el.className = 'song';
        this.el.appendChild(this.track.el);
        this.addEventListener('playbackstart', evt => {
            this.play();
        });
        this.addEventListener('playbackstop', evt => {
            this.playing = false;
        });
    }

    dispatchEvent(event, detail) {
        this.el.dispatchEvent(new CustomEvent(event, {detail: detail}));
    }

    addEventListener(event, listener) {
        this.el.addEventListener(event, listener);
    }

    removeEventListener(event, listener) {
        this.el.removeEventListener(event, listener);
    }

    playBeat(instrument, beat) {
        const audio = this.audio;
        const sequence = [];
        beat.notes.forEach(note => {
            if (!note.value) {
                return;
            }
            const buffer = instrument.createBuffer(audio, note);
            sequence.push([0.0, buffer]);
        });
        audio.startPlayback({
            start: audio.ctx.currentTime,
            audioSequence: sequence,
        });
    }

    play() {
        this.playing = true;
        const playback = this.buildPlayback();
        playback.lastEl = playback.visualSequence[0].bar;
        playback.lastEl.classList.add('playing');
        playback.start = this.audio.ctx.currentTime;
        this.audio.startPlayback(playback);
        this.playbackLoop(playback);
    }

    buildPlayback() {
        const audio = this.audio;
        const instrument = this.track.instrument;
        const audioSequence = [];
        const visualSequence = [];
        let timestamp = 0.0;
        let skipping = this.cursor.active;
        this.track.bars.forEach(bar => {
            const timeFactor = (30 * bar.signature[0]) / bar.tempo;
            bar.beats.forEach(beat => {
                if (skipping) {
                    if (beat == this.cursor.currentBeat) {
                        skipping = false;
                    } else {
                        return;
                    }
                }
                beat.notes.forEach(note => {
                    if (('' + note.value).length == 0) {
                        return;
                    }
                    const buffer = instrument.createBuffer(audio, note);
                    audioSequence.push([timestamp, buffer]);
                });
                const start = timestamp;
                const barLength = LENGTH_VALUES[beat.length] / bar.maxLength;
                timestamp += barLength * timeFactor;
                visualSequence.push({
                    start: start,
                    end: timestamp,
                    bar: beat.el
                });
            });
        });
        return {
            audioSequence: audioSequence,
            visualSequence: visualSequence
        };
    }

    playbackLoop(playback) {
        if (!this.playing) {
            this.audio.stop();
            playback.lastEl.classList.remove('playing');
            return;
        }
        if (playback.visualSequence.length == 0) {
            this.dispatchEvent('playbackstop');
            return;
        }
        const t = this.audio.ctx.currentTime - playback.start;
        if (t >= playback.visualSequence[0].end) {
            playback.lastEl.classList.remove('playing');
            playback.visualSequence = playback.visualSequence.slice(1);
            if (playback.visualSequence.length > 0) {
                playback.lastEl = playback.visualSequence[0].bar;
                playback.lastEl.classList.add('playing');
            }
        } else {
            playback.lastEl.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            });
        }
        setTimeout(() => this.playbackLoop(playback), 0);
    }

}
