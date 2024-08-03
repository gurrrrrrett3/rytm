import Screen_Game from "../../menus/canvas/ui/screen/game";
import { Axis } from "./enum/axis";
import UiScreen from "./uiScreen";

export default class UiManager {

    public screens: Record<string, UiScreen> = {};
    public currentScreen: UiScreen | null = new Screen_Game();

    public playfieldSize: { width: number, height: number } = { width: 160, height: 90 };
    public playfieldOffset: { x: number, y: number } = { x: 0, y: 0 };
    public playfieldScale: number = 1;

    public beatIntensity: number = 1;

    public resize(): void {

        // playfield is always 160 units by 90 units
        // the playfield is centered on the screen, and will be scaled to be as large as possible while maintaining the aspect ratio
        // the playfield will be scaled by the smaller of the two scales

        const scaleX = window.innerWidth / this.playfieldSize.width;
        const scaleY = window.innerHeight / this.playfieldSize.height;

        const scale = Math.min(scaleX, scaleY);

        const scaledWidth = this.playfieldSize.width * scale;
        const scaledHeight = this.playfieldSize.height * scale;

        const offsetX = (window.innerWidth - scaledWidth) / 2;
        const offsetY = (window.innerHeight - scaledHeight) / 2;


        this.playfieldScale = scale;
        this.playfieldOffset = { x: offsetX, y: offsetY };

    }

    public get playfieldScreenSize(): { width: number, height: number } {
        return { width: this.playfieldSize.width * this.playfieldScale, height: this.playfieldSize.height * this.playfieldScale };
    }

    public convertToScreenCoordinates(x: number, y: number): { x: number, y: number } {

        const screenX = (x * this.playfieldScale) + this.playfieldOffset.x;
        const screenY = (y * this.playfieldScale) + this.playfieldOffset.y;

        return { x: screenX, y: screenY };
    }

    public convertSingleToScreenCoordinates(v: number, type: Axis): number {
        switch (type) {
            case Axis.X:
                return (v * this.playfieldScale) + this.playfieldOffset.x;
            case Axis.Y:
                return (v * this.playfieldScale) + this.playfieldOffset.y;
        }

    }

    public convertToPlayfieldCoordinates(x: number, y: number): { x: number, y: number } {

        const playfieldX = (x - this.playfieldOffset.x) / this.playfieldScale;
        const playfieldY = (y - this.playfieldOffset.y) / this.playfieldScale;

        return { x: playfieldX, y: playfieldY };
    }

    public addScreen(screen: UiScreen): void {
        this.screens[screen.id] = screen;
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this.currentScreen) {
            this.currentScreen.render(context);
        }

        // draw the playfield border
        context.strokeStyle = "#fff";
        context.lineWidth = 5;
        // context.strokeRect(this.playfieldOffset.x, this.playfieldOffset.y, this.playfieldSize.width * this.playfieldScale, this.playfieldSize.height * this.playfieldScale);

        // black out the area outside the playfield
        context.fillStyle = "#000";
        context.fillRect(0, 0, this.playfieldOffset.x, window.innerHeight);
        context.fillRect(this.playfieldOffset.x + this.playfieldSize.width * this.playfieldScale, 0, window.innerWidth, window.innerHeight);
        context.fillRect(this.playfieldOffset.x, 0, this.playfieldSize.width * this.playfieldScale, this.playfieldOffset.y);
        context.fillRect(this.playfieldOffset.x, this.playfieldOffset.y + this.playfieldSize.height * this.playfieldScale, this.playfieldSize.width * this.playfieldScale, window.innerHeight);

    }

    public update(delta: number): void {
        if (this.currentScreen) {
            this.currentScreen.update(delta);
        }
    }
}