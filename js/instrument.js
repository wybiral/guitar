/*
    Instrument handles synthesis to create Audio buffers from hit parameters.
*/

class Instrument {

    constructor() {
        this.CACHE = {};
        this.tuning = [
            329.6,
            246.9,
            196.0,
            146.8,
            110.0,
            82.4,
        ];
        // This should be replaced with smaller noise source but we'll keep
        // using Processing for now
        const processing = new Processing();
        processing.noiseSeed(0);
        processing.noiseDetail(8, 0.5);
        this.noise = processing.noise;
    }

    hit(buffer, rate, frequency) {
        const period = Math.floor(rate / frequency);
        const decay = 0.993 / 2;
        const length = buffer.length - period;
        const noiseScale = 3.0 / period;
        // random excitation
        for (let i = 0; i < period; i++) {
            buffer[i] = this.noise(i * noiseScale) * 2 - 1;
        }
        // low pass ring buffer
        for (let  i = 0; i < length; i++) {
            buffer[i + period] = (buffer[i] + buffer[i + 1]) * decay;
        }
    }

    createBuffer(audio, note) {
        const key = [note.line, note.value].toString();
        if (typeof this.CACHE[key] === 'undefined') {
            let frequency = this.tuning[note.line];
            frequency *= Math.pow(2.0, note.value / 12.0);
            const buffer = audio.createBuffer({duration: 2.5});
            this.hit(buffer.getChannelData(0), audio.rate, frequency);
            this.CACHE[key] = buffer;
        }
        return this.CACHE[key];
    }
}
