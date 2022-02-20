window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;

function Playback() {
    this.ctx = new AudioContext();
    this.rate = this.ctx.sampleRate;
    this.gainNode = this.ctx.createGain();
    this.gainNode.connect(this.ctx.destination);
    this.node = null;
};

Playback.prototype.setGain = function(gain) {
    this.gainNode.gain.value = gain;
};

Playback.prototype.createBuffer = function(options) {
    var length;
    if (options.length) {
        length = options.length;
    } else if (options.duration) {
        length = Math.floor(this.rate * options.duration);
    }
    return this.ctx.createBuffer(1, length, this.rate);
};

Playback.prototype.playBuffer = function(when, buffer) {
    var input = this.ctx.createBufferSource();
    input.buffer = buffer;
    input.connect(this.node);
    input.start(when);
};

Playback.prototype.playSequence = function(sequence, tempo, when) {
    var factor = 120 / tempo;
    if (this.node !== null) {
        this.node.disconnect(0);
    }
    this.node = this.ctx.createDynamicsCompressor();
    this.node.connect(this.gainNode);
    for (var i = 0; i < sequence.length; i++) {
        var time = (sequence[i][0] * factor);
        var note = sequence[i][1];
        this.playBuffer(when + time, note);
    }
};

