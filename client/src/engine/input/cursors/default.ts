import MouseCursor from "../mouseCursor";

export default class DefaultMouseCursor extends MouseCursor {
    render(context: CanvasRenderingContext2D, screenPosition: { x: number, y: number }): void {
        context.fillStyle = 'white';

        context.moveTo(screenPosition.x, screenPosition.y - 10);
        context.beginPath();
        context.arc(screenPosition.x, screenPosition.y, 5, 0, Math.PI * 2);
        context.fill();

    }
}