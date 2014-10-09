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

            var drawStroke = function (e, isEnd) {
                if (_this.lastPoint == null)
                    return;
                var curPoint = convertToPoint(e);
                _this.context.beginPath();
                _this.context.moveTo(_this.lastPoint.x, _this.lastPoint.y);
                _this.context.lineTo(curPoint.x, curPoint.y);
                _this.context.closePath();
                _this.context.stroke();
                _this.lastPoint = isEnd ? null : curPoint;
            };

            var $canvas = $(canvasElement);
            $canvas.mousedown(function (e) {
                return _this.lastPoint = convertToPoint(e);
            }).mouseup(function (e) {
                _this.lastPoint = null;
                _this.fireDrawEvent();
            }).mousemove(function (e) {
                return drawStroke(e, false);
            }).mouseleave(function (e) {
                return drawStroke(e, true);
            }).mouseenter(function (e) {
                return drawStroke(e, false);
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

    var numOfCells = 2 * 4;
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
        'v': 'V'
    };

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
    });
})(RomanLettersDrillBook || (RomanLettersDrillBook = {}));
//# sourceMappingURL=app.js.map
