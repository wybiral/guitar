var EXAMPLES = {
    'Moonlight Sonata': {"tempo":75,"song":[[0,4,[[3,2],[4,0]]],[1,4,[[2,2]]],[2,4,[[1,1]]],[3,4,[[3,2]]],[4,4,[[2,2]]],[5,4,[[1,1]]],[6,4,[[3,2]]],[7,4,[[2,2]]],[8,4,[[1,1]]],[9,4,[[3,2]]],[10,4,[[2,2]]],[11,4,[[1,1]]],[12,4,[[3,2],[5,3]]],[13,4,[[2,2]]],[14,4,[[1,1]]],[15,4,[[3,2]]],[16,4,[[2,2]]],[17,4,[[1,1]]],[18,4,[[3,2]]],[19,4,[[2,2]]],[20,4,[[1,1]]],[21,4,[[3,2]]],[22,4,[[2,2]]],[23,4,[[1,1]]],[24,4,[[3,3],[5,1]]],[25,4,[[2,2]]],[26,4,[[1,1]]],[27,4,[[3,3]]],[28,4,[[2,2]]],[29,4,[[1,1]]],[30,4,[[3,3],[4,5]]],[31,4,[[2,3]]],[32,4,[[1,3]]],[33,4,[[3,3]]],[34,4,[[2,3]]],[35,4,[[1,3]]],[36,4,[[3,2],[4,0]]],[37,4,[[2,1]]],[38,4,[[1,3]]],[39,4,[[3,2]]],[40,4,[[2,2]]],[41,4,[[1,1]]],[42,4,[[3,2],[5,0]]],[43,4,[[2,2]]],[44,4,[[1,0]]],[45,4,[[3,0]]],[46,4,[[2,1]]],[47,4,[[1,0]]],[48,4,[[2,2],[3,2],[4,0]]],[49,4,[[3,2]]],[50,4,[[2,2]]],[51,4,[[3,2]]],[52,4,[[2,2]]],[53,4,[[1,1]]],[54,4,[[3,2]]],[55,4,[[2,2]]],[56,4,[[1,1]]],[57,4,[[0,0],[3,2]]],[58,4,[[2,2]]],[59,8,[[1,1]]],[60,8,[[0,0]]],[61,4,[[0,0],[5,0]]],[62,4,[[2,4]]],[63,4,[[1,3]]],[64,4,[[3,2]]],[65,4,[[2,4]]],[66,4,[[1,3]]],[67,4,[[3,2]]],[68,4,[[2,4]]],[69,4,[[1,3]]],[70,4,[[0,0],[3,2]]],[71,4,[[2,4]]],[72,8,[[1,3]]],[73,8,[[0,0]]],[74,4,[[0,0],[3,2],[4,0]]],[75,4,[[2,2]]],[76,4,[[1,1]]],[77,4,[[3,2]]],[78,4,[[2,2]]],[79,4,[[1,1]]],[80,4,[[0,1],[3,0]]],[81,4,[[2,2]]],[82,4,[[1,3]]],[83,4,[[3,3]]],[84,4,[[2,2]]],[85,4,[[1,3]]],[86,4,[[0,0],[3,2],[5,3]]],[87,4,[[2,0]]],[88,4,[[1,1]]],[89,4,[[3,2]]],[90,4,[[2,0]]],[91,4,[[1,1]]],[92,4,[[1,3],[3,3],[5,3]]],[93,4,[[2,0]]],[94,4,[[1,0]]],[95,4,[[0,3],[3,3]]],[96,4,[[2,0]]],[97,4,[[1,0]]],[98,4,[[1,1],[3,2],[4,3]]]]},
    'Across the Universe': {"tempo":70,"song":[[0,4,[[0,2],[2,2]]],[1,4,[[3,0]]],[2,4,[[0,10],[2,11]]],[3,4,[[3,0]]],[4,4,[[0,9],[2,9]]],[5,4,[[0,7],[2,7]]],[6,4,[[0,5],[2,6]]],[7,4,[[1,7]]],[8,4,[[1,2],[2,2],[3,4]]],[9,4,[[1,2],[2,4],[3,4]]],[10,4,[[1,2],[2,2],[3,4]]],[11,4,[[1,2],[2,4],[3,4]]],[12,4,[[1,2],[2,2],[3,4]]],[13,4,[[1,2],[2,4],[3,4]]],[14,4,[[1,2],[2,2],[3,4]]],[15,4,[[1,2],[2,4],[3,4]]],[16,4,[[1,0],[2,2],[3,2]]],[17,4,[[1,0],[2,4],[3,2]]],[18,4,[[1,0],[2,2],[3,2]]],[19,4,[[1,0],[2,4],[3,2]]],[20,4,[[1,2],[2,2],[3,2]]],[21,4,[[1,0],[2,4],[3,2]]],[22,4,[[1,0],[2,2],[3,2]]],[23,4,[[1,0],[2,4],[3,2]]]]},
    'Stairway to Heaven': {"tempo":75,"song":[[0,4,[[3,7]]],[1,4,[[2,5]]],[2,4,[[1,5]]],[3,4,[[0,5]]],[4,4,[[0,7],[3,6]]],[5,4,[[1,5]]],[6,4,[[2,5]]],[7,4,[[0,7]]],[8,4,[[0,8],[3,5]]],[9,4,[[1,5]]],[10,4,[[2,5]]],[11,4,[[0,8]]],[12,4,[[0,2],[3,4]]],[13,4,[[1,3]]],[14,4,[[2,2]]],[15,4,[[0,2]]],[16,4,[[0,0],[3,3]]],[17,4,[[1,1]]],[18,4,[[2,2]]],[19,2,[[1,1]]],[20,4,[[0,0]]],[21,4,[[1,1]]],[22,4,[[2,2]]],[23,4,[[1,0],[2,0],[4,2]]],[24,4,[[1,1],[2,2],[4,0]]],[25,4,[[1,1],[2,2],[4,0]]]]},
};

function addBeat() {
    var editor = $('#editor');
    var beat = $('<td class="beat"></td>');
    beat.append('<div class="duration"></div>');
    for (var i = 0; i < 6; i++) {
        beat.append('<div class="string"></div>');

    }
    editor.find('#editor-strings').append(beat);
}

function loadSong(song) {
    document.getElementById('tempo').value = song.tempo;
    var max = 0;
    for (var i = 0; i < song.song.length; i++) {
        max = Math.max(max, song.song[i][0]);
    }
    $('#editor .beat').remove();
    for (var i = 0; i < max + 1; i++) {
        addBeat();
    }
    var count = null;
    var beats = $('#editor .beat');
    for (var i = 0; i < song.song.length; i++) {
        var beat = song.song[i];
        var el = $(beats[beat[0]]);
        var strings = el.find('.string');
        if (beat[1] != count) {
            count = beat[1];
            el.find('.duration').text(count);
        }
        for (var j = 0; j < beat[2].length; j++) {
            var hit = beat[2][j];
            $(strings[hit[0]]).append('<span>' + hit[1] + '</span>');
        }
    }
}

function getSong() {
    var json = [];
    var count = 4;
    $('#editor-strings .beat').each(function(i) {
        var element = $(this).find('.duration');
        if ($.trim(element.text()).length) {
            count = parseInt(element.text());
        }
        var hits = [];
        $(this).find('.string').each(function(j) {
            var fret = $(this).find('span');
            if (fret.length) {
                hits.push([j, fret.text() | 0]);
            }
        });
        if (hits.length) {
            json.push([i, count, hits]);
        }
    });
    return {tempo: document.getElementById('tempo').value | 0, song: json};
}

window.onload = (function() {
    if (typeof window.AudioContext == 'undefined') {
        var error = 'Audio API not supported by browser :(';
        $('#main').html(error);
        throw error;
    }

    var audio = new Playback();
    var ctx = audio;

    for (var name in EXAMPLES) {
        $('#examples').append('<option>' + name + '</option>');
    }

    for (var i = 0; i < 32; i++) {
        addBeat();
    }
    $($('#editor .beat .duration')[0]).text('4');

    $('#examples').change(function() {
        var value = $(this).val();
        if (value) {
            loadSong(EXAMPLES[value]);
        }
    });

    $('#editor').on('click', '.beat .string', function() {
        var string = $(this);
        var input = $('<input maxlength="2">');

        if (string.parent().index() == $('#editor-strings').children().length - 1) {
            addBeat();
        }

        if (string.children().length == 1) {
            if (string.find('span').length == 1) {
                input.val($(this).find('span').text());
                $(this).find('span').remove();
            } else {
                return;
            }
        }
        string.append(input);
        input.keydown(function(evt) {
            function getPosition() {
                var beat = string.parent();
                return {
                    beat: $('#editor-strings').find('.beat').index(beat),
                    string: beat.find('.string').index(string)
                }
            }
            function moveTo(beat, string) {
                input.blur();
                var element = $($($('#editor-strings').find('.beat')[beat]).find('.string')[string]);
                element.click();
                setTimeout(function() {
                    element.children().focus()[0].select();
                }, 10);
            }
            switch (evt.which) {
                case 37:
                    var position = getPosition();
                    moveTo(Math.max(0, position.beat - 1), position.string);
                    evt.preventDefault();
                    break;
                case 39:
                    var position = getPosition();
                    moveTo(position.beat + 1, position.string);
                    evt.preventDefault();
                    break;
                case 38:
                    var position = getPosition();
                    position.string--;
                    while (position.string < 0) position.string += 6;
                    moveTo(position.beat, position.string);
                    evt.preventDefault();
                    break;
                case 40:
                    var position = getPosition();
                    moveTo(position.beat, (position.string + 1) % 6);
                    evt.preventDefault();
                    break;
            }
        });
        input.blur(function() {
            var text = parseInt(input.val());
            if (string.children().length == 1 && !isNaN(text)) {
                string.append($('<span></span>').text(text));
            }
            input.remove();
        });
        input.focus();
        input[0].select();
    });

    var freqs = [
        329.6,
        246.9,
        196,
        146.8,
        110,
        82.4
    ]


    $('#editor-strings').on('click', '.duration', function() {
        var duration = $(this).text();
        var symbols = ['1', '2', '4', '8', '16', ' '];
        if (duration) {
            $(this).text(symbols[(symbols.indexOf(duration) + 1) % symbols.length]);
        } else {
            $(this).text('4');
        }
    });

    var processing = new Processing();
    processing.noiseSeed(0);
    processing.noiseDetail(8, 0.5);
    var noise = processing.noise;
    var playing = false;

    document.getElementById('volume').onchange = function() {
        audio.setGain(document.getElementById('volume').value);
    };

    document.getElementById('play').onclick = (function() {
        if (playing) {
            playing = false;
            return;
        }
        document.getElementById('play').value = 'Stop';
        var duration = 2.5;
        var CACHE = {};
        var cursor = 0.0;
        var processing = new Processing();
        var instrument = new Function(
            ['buffer', 'rate', 'frequency', 'noise'],
            $('#instrument').val()
        );
        var timeline = [];
        var sequence = [];
        var song = getSong();
        var strumSpeed = document.getElementById('strum-speed').value;
        var lastTime = 0, lastCount = 4;
        for (var i = 0; i < song.song.length; i++) {
            var column = song.song[i];
            var time = column[0];
            var count = column[1];
            for (var j = 0; j < (time - lastTime); j++) {
                cursor += (1 / lastCount);
                timeline.push(cursor);
            }
            lastTime = time;
            lastCount = count;
            for (var j = 0; j < column[2].length; j++) {
                var hit = column[2][j];
                var frequency = Math.floor(freqs[hit[0]] * Math.pow(2.0, (hit[1] / 12.0)));
                var key = hit.toString();
                if (!(key in CACHE)) {
                    var buffer = audio.createBuffer({duration: duration});
                    instrument(
                        buffer.getChannelData(0),
                        audio.rate,
                        frequency,
                        noise
                    );
                    CACHE[key] = buffer;
                }
                sequence.push([cursor + ((5-j) / 5) * ((1 - strumSpeed) * 0.2), CACHE[key]]);
            }
        }
        timeline.push(cursor + 1.5);
        var factor = 120 / song.tempo;
        var start = audio.ctx.currentTime + 0.75;
        var lastNote = start + (factor * timeline[timeline.length - 1]);
        audio.playSequence(sequence, song.tempo, start);
        audio.setGain(document.getElementById('volume').value);
        var cursor = $('#cursor');
        cursor.css('top', '20px');
        var index = 0;
        playing = true;
        (function loop() {
            var time = audio.ctx.currentTime;
            if (time > start && cursor.css('display') == 'none') {
                cursor.css('display', 'inline-block');
            }
            $('#editor .beat.playing').removeClass('playing');
            while (index < timeline.length && time > (start + (factor * timeline[index]))) {
                index++;
            }
            if (playing && index < timeline.length && time < lastNote) {
                cursor.css('left', 20 * index);
                if (20 * index + 20 > $('#editor')[0].scrollLeft + $('#editor').width()) {
                    $('#editor').scrollLeft(20 * index);
                }
                setTimeout(loop, 20);
            } else {
                cursor.css('display', 'none');
                document.getElementById('play').value = 'Play';
                if (audio.node !== null) {
                    audio.node.disconnect(0);
                    audio.node = null;
                }
                playing = false;
            }
        })();
    });
});


