import Engine from "../../core/engine";
import Debug from "../../util/debug/debug";
import { Axis } from "../enum/axis";

export default class UiComponent {

    public parent?: UiComponent;
    public children: UiComponent[] = [];
    constructor(
        public id: string,
        public type: string,
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) { }

    public update(delta: number): void {
        // to be implemented
    }

    public render(context: CanvasRenderingContext2D): void {
        // to be implemented
    }

    public getScreenspaceCoordinates(): { x: number, y: number, width: number, height: number } {
        const position = Engine.uiManager.convertToScreenCoordinates(this.px, this.py);
        const size = Engine.uiManager.convertToScreenCoordinates(this.width, this.height);

        return {
            x: position.x,
            y: position.y,
            width: size.x,
            height: size.y
        };
    }

    public get px(): number {
        return this.parent ? this.x + this.parent.x : this.x;
    }

    public get py(): number {
        return this.parent ? this.y + this.parent.y : this.y;
    }

    public get sx(): number {
        return Engine.uiManager.convertSingleToScreenCoordinates(this.px, Axis.X);
    }

    public get sy(): number {
        return Engine.uiManager.convertSingleToScreenCoordinates(this.py, Axis.Y);
    }

    public get sw(): number {
        return Engine.uiManager.convertSingleToScreenCoordinates(this.width, Axis.X);
    }

    public get sh(): number {
        return Engine.uiManager.convertSingleToScreenCoordinates(this.height, Axis.Y);
    }

}