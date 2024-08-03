import Engine from "../../core/engine";
import UiComponent from "./uiComponent";

export default class UiButton extends UiComponent {

    public isHovered: boolean = false;
    public isPressed: boolean = false;

    constructor(
        id: string,
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public text: string,
        public onClick: () => void
    ) {
        super(id, 'button', x, y, width, height);
    }

    public update(delta: number): void {

        const mouse = Engine.inputManager.mousePosition

        if (mouse.x >= this.sx && mouse.x <= this.sx + this.sw
            && mouse.y >= this.sy && mouse.y <= this.sy + this.sh) {
            this.isHovered = true;

            if (Engine.inputManager.mouseDown) {
                this.isPressed = true;
            } else if (this.isPressed) {
                this.onClick();
                this.isPressed = false;
            }
        } else {
            this.isHovered = false;
            this.isPressed = false
        }

    }

    public render(context: CanvasRenderingContext2D): void {

        if (this.isHovered && !this.isPressed) {
            context.fillStyle = "#fff";
            context.fillRect(this.sx, this.sy, this.sw, this.sh);

            context.fillStyle = "#000";
            context.font = "16px monospace";
            context.fillText(this.text, this.sx + 5, this.sy + 20);
        } else {
            context.strokeStyle = "#fff";
            context.lineWidth = 2;

            context.strokeRect(this.sx, this.sy, this.sw, this.sh);

            context.fillStyle = "#fff";
            context.font = "16px monospace";
            context.fillText(this.text, this.sx + 5, this.sy + 20);
        }
    }
}