/*
    Handle all of the direct Audio interface.
*/

class Audio {

    constructor() {
        this.ctx = new AudioContext();
        this.rate = this.ctx.sampleRate;
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.ctx.destination);
        this.node = this.ctx.createDynamicsCompressor();
        this.node.connect(this.gainNode);
    }

    setGain(gain) {
        this.gainNode.gain.value = gain;
    }

    stop() {
        this.node.disconnect(0);
        this.node = this.ctx.createDynamicsCompressor();
        this.node.connect(this.gainNode);
    }

    createBuffer(options) {
        let length = 0;
        if (options.length) {
            length = options.length;
        } else if (options.duration) {
            length = Math.floor(this.rate * options.duration);
        }
        return this.ctx.createBuffer(1, length, this.rate);
    }

    playBuffer(when, buffer) {
        const input = this.ctx.createBufferSource();
        input.buffer = buffer;
        input.connect(this.node);
        input.start(when);
    }

    startPlayback(playback) {
        const start = playback.start;
        const sequence = playback.audioSequence;
        for (let i = 0; i < sequence.length; i++) {
            const time = sequence[i][0];
            const note = sequence[i][1];
            this.playBuffer(start + time, note);
        }
    }
}
