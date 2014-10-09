/// <reference path="typings/jquery/jquery.d.ts" />

module RomanLettersDrillBook {

    declare function OCRAD(image: any): string;

    class Point {
        x: number;
        y: number;
    }

    class DrawableCanvas {
        lastPoint: Point;
        context: CanvasRenderingContext2D;
        canvasElement: HTMLCanvasElement;
        debounceTimer: number;

        constructor(canvasElement: HTMLCanvasElement) {
            this.lastPoint = null;
            this.canvasElement = canvasElement;
            this.context = canvasElement.getContext('2d');
            this.context.fillStyle = 'white';
            this.context.fillRect(0, 0, canvasElement.width, canvasElement.height);
            this.context.fillStyle = 'black';

            this.context.lineJoin = 'round';
            this.context.lineWidth = 8;
            this.debounceTimer = null;

            var convertToPoint = (e: JQueryMouseEventObject) => { return { x: e.offsetX, y: e.offsetY } };

            var drawStroke = (e: JQueryMouseEventObject, isEnd: boolean) => {
                if (this.lastPoint == null) return;
                var curPoint = convertToPoint(e);
                this.context.beginPath();
                this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
                this.context.lineTo(curPoint.x, curPoint.y);
                this.context.closePath();
                this.context.stroke();
                this.lastPoint = isEnd ? null : curPoint;
            };

            var $canvas = $(canvasElement);
            $canvas
                .mousedown(e => this.lastPoint = convertToPoint(e))
                .mouseup(e => {
                    this.lastPoint = null;
                    this.fireDrawEvent();
                })
                .mousemove(e => drawStroke(e, false))
                .mouseleave(e => drawStroke(e, true))
                .mouseenter(e => drawStroke(e, false));
        }

        private fireDrawEvent() {
            if (this.debounceTimer != null) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                $(this.canvasElement).trigger('draw');
            }, 200);
        }
    }

    var numOfCells = 2 * 4;
    var $cellContainer = $('.cell-container');
    var cellHtml = $cellContainer.html();
    for (var i = 0; i < numOfCells; i++)$cellContainer.append(cellHtml);

    $('.canvas-cell').each((n, e: HTMLCanvasElement) => new DrawableCanvas(e));

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
    };

    $(document).on('draw', e => {
        var text = (OCRAD(e.target) || '').trim();
        if (text == '') text = ' ';
        else {
            var out = mapFixUp[text];
            if (out == undefined) {
                console.log('unrecognized:' + text);
                out = '?';
            }
            text = out;
        }
        $(e.target).closest('.cell').find('.recognized-text').text(text);

        var letters = $recognizedTexts
            .map((n, e) => $(e).text()).toArray()
            .map(t => t == "" ? " " : t)
            .join('').trim();

        var blocks = translateLettersToJP(letters);

        $translatedTexts.text('');
        var index = 0;
        blocks.forEach(b => {
            $($translatedTexts[index]).text(b.char);
            index += b.len;
        });
    });
} 