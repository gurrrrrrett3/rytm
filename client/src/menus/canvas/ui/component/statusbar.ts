import Engine from "../../../../engine/core/engine";
import UiGroup from "../../../../engine/ui/component/uiGroup";

export default class StatusBar extends UiGroup {

    constructor() {
        super('statusbar', 0, 88, 160, 2);

        this.add(

        )
    }

    public render(context: CanvasRenderingContext2D): void {
        super.render(context);

        context.fillStyle = "#fff";
        context.font = "16px monospace";

        context.fillRect(this.sx, this.sy, this.sw * Engine.audioManager.currentSong.durationPercent, (this.sh / 5) * Engine.audioManager.currentSong.timeUntilNextBeatPercent * Engine.uiManager.beatIntensity);
        context.fillText(`${Engine.package} ${Engine.version} | FPS: ${Math.round(Engine.renderer.avgFps)} | ${Engine.audioManager.dataString} | ${Engine.chartExecutor.pointer}`, this.sx + 5, this.sy + 20);
    }
}