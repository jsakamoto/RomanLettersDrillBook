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
            this.context.lineWidth = 4;
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

    $('.canvas-cell').each(function (n, e) {
        return new DrawableCanvas(e);
    });
    $(document).on('draw', function (e) {
        var text = OCRAD(e.target);
        $(e.target).closest('.cell').find('.recognized-text').text(text);
    });
})(RomanLettersDrillBook || (RomanLettersDrillBook = {}));
//# sourceMappingURL=app.js.map
