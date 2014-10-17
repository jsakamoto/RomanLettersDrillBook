/// <reference path="typings/jquery/jquery.d.ts" />
var RomanLettersDrillBook;
(function (RomanLettersDrillBook) {
    var Point = (function () {
        function Point() {
        }
        return Point;
    })();

    var DrawableCanvas = (function () {
        function DrawableCanvas(canvasElement) {
            var _this = this;
            this.lastPoint = null;
            this.canvasElement = canvasElement;
            this.context = canvasElement.getContext('2d');
            this.context.fillStyle = 'white';
            this.context.fillRect(0, 0, canvasElement.width, canvasElement.height);
            this.context.fillStyle = 'black';

            this.context.lineJoin = 'round';
            this.context.lineWidth = 8;
            this.debounceTimer = null;

            var convertToPoint = function (e) {
                return { x: e.offsetX, y: e.offsetY };
            };

            var eventType = 'mouse';
            if (navigator.pointerEnabled)
                eventType = 'pointer';

            var $canvas = $(canvasElement);
            $canvas.on(eventType + 'down', function (e) {
                _this.canvasElement.setCapture();
                _this.context.strokeStyle = e.button == 0 ? 'black' : 'white';
                _this.context.lineWidth = e.button == 0 ? 8 : 32;
                _this.lastPoint = convertToPoint(e);
            }).on('mousemove', function (e) {
                if (_this.lastPoint == null)
                    return;
                var curPoint = convertToPoint(e);
                _this.context.beginPath();
                _this.context.moveTo(_this.lastPoint.x, _this.lastPoint.y);
                _this.context.lineTo(curPoint.x, curPoint.y);
                _this.context.closePath();
                _this.context.stroke();
                _this.lastPoint = curPoint;
            }).on('mouseup', function (e) {
                _this.canvasElement.releaseCapture();
                _this.lastPoint = null;
                _this.fireDrawEvent();
            });
        }
        DrawableCanvas.prototype.fireDrawEvent = function () {
            var _this = this;
            if (this.debounceTimer != null)
                clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(function () {
                $(_this.canvasElement).trigger('draw');
            }, 200);
        };
        return DrawableCanvas;
    })();

    var numOfCells = 2 * 10;
    var $cellContainer = $('.cell-container');
    var cellHtml = $cellContainer.html();
    for (var i = 0; i < numOfCells; i++)
        $cellContainer.append(cellHtml);

    $('.canvas-cell').each(function (n, e) {
        return new DrawableCanvas(e);
    });

    var $recognizedTexts = $('.recognized-text');
    var $translatedTexts = $('.translated-text');

    var mapFixUp = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F',
        'G': 'G',
        'H': 'H',
        'I': 'I',
        'J': 'J',
        'K': 'K',
        'L': 'L',
        'M': 'M',
        'N': 'N',
        'O': 'O',
        'P': 'P',
        'Q': 'Q',
        'R': 'R',
        'S': 'S',
        'T': 'T',
        'U': 'U',
        'V': 'V',
        'W': 'W',
        'X': 'X',
        'Y': 'Y',
        'Z': 'Z',
        'c': 'C',
        'o': 'O',
        '0': 'O',
        's': 'S',
        '5': 'S',
        'g': 'S',
        'w': 'W',
        'x': 'X',
        'z': 'Z',
        'u': 'U',
        'l': 'I',
        '|': 'I',
        'r': 'T',
        'v': 'V',
        'p': 'P',
        'a': 'Q'
    };

    var translatedText = '';

    $(document).on('draw', function (e) {
        var text = (OCRAD(e.target) || '').trim();
        if (text == '')
            text = ' ';
        else {
            var out = mapFixUp[text];
            if (out == undefined) {
                console.log('unrecognized:' + text);
                out = '?';
            }
            text = out;
        }
        $(e.target).closest('.cell').find('.recognized-text').text(text);

        var letters = $recognizedTexts.map(function (n, e) {
            return $(e).text();
        }).toArray().map(function (t) {
            return t == "" ? " " : t;
        }).join('').trim();

        var blocks = RomanLettersDrillBook.translateLettersToJP(letters);

        $translatedTexts.text('');
        var index = 0;
        blocks.forEach(function (b) {
            $($translatedTexts[index]).text(b.char);
            index += b.len;
        });

        translatedText = blocks.map(function (e) {
            return e.char;
        }).join('').trim();
    });

    var $btnPlay = $('#btnPlay');

    var audio = new Audio();
    audio.autoplay = true;
    audio.onloadstart = function () {
        return $btnPlay.addClass('disabled');
    };
    audio.onloadeddata = function () {
        return $btnPlay.removeClass('disabled');
    };

    var prePlayedText = '';
    $btnPlay.click(function () {
        if (translatedText == '')
            return;
        var url = '/api/voice/' + encodeURI(translatedText);
        if (prePlayedText == translatedText) {
            audio.currentTime = 0;
            audio.play();
        } else {
            audio.src = url;
            prePlayedText = translatedText;
        }
    });
})(RomanLettersDrillBook || (RomanLettersDrillBook = {}));
//# sourceMappingURL=app.js.map
