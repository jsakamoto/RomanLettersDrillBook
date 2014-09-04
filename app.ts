/// <reference path="typings/jquery/jquery.d.ts" />
module RomanLettersDrillBook {

    class Point {
        x: number;
        y: number;
    }

    class DrawableCanvas {
        lastPoint: Point;
        context: CanvasRenderingContext2D;

        constructor(canvasElement: any) {
            this.lastPoint = null;
            this.context = canvasElement.getContext('2d');
            this.context.lineJoin = 'round';
            this.context.lineWidth = 4;

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
                .mouseup(e => this.lastPoint = null)
                .mousemove(e => drawStroke(e, false))
                .mouseleave(e => drawStroke(e, true))
                .mouseenter(e => drawStroke(e, false));
        }
    }

    $('.canvas-cell').each((n, e) => new DrawableCanvas(e));
} 