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
            this.context = canvasElement.getContext('2d');
            this.context.lineJoin = 'round';
            this.context.lineWidth = 4;

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
                return _this.lastPoint = null;
            }).mousemove(function (e) {
                return drawStroke(e, false);
            }).mouseleave(function (e) {
                return drawStroke(e, true);
            }).mouseenter(function (e) {
                return drawStroke(e, false);
            });
        }
        return DrawableCanvas;
    })();

    $('.canvas-cell').each(function (n, e) {
        return new DrawableCanvas(e);
    });
})(RomanLettersDrillBook || (RomanLettersDrillBook = {}));
//# sourceMappingURL=app.js.map
