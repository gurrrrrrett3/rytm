export default abstract class MouseCursor {
    abstract render(context: CanvasRenderingContext2D, screenPosition: { x: number, y: number }): void;
}