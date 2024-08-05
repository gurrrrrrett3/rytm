import Engine from "../../../../engine/core/engine";
import UiComponent from "../../../../engine/ui/component/uiComponent";
import Lerp from "../../../../engine/util/math/lerp";

export default class SongTitle extends UiComponent {

    constructor() {
        super('songtitle', "text", 160, 84, 160, 8);
    }

    public render(context: CanvasRenderingContext2D): void {
        super.render(context);
        context.save();

        context.fillStyle = "#fff";
        context.font = "24px monospace";
        context.textAlign = "right";

        // slide in from the right, until 5 seconds into the song, then slide back out
        const slideTime = 1;
        const x = this.sx + 160 * Lerp.smoothStep(0, 1, Math.min(1, Engine.audioManager.currentTime / slideTime));

        if (!Engine.chartLoader.chart) {
            context.restore();
            return;
        }

        context.fillText(Engine.chartLoader.chart.meta.title!, x, this.sy + 24);

        context.font = "16px monospace";
        context.fillText(Engine.chartLoader.chart.meta.artist!, x, this.sy + 48);
        context.fillText(`chart by ${Engine.chartLoader.chart.meta.author}`, x, this.sy + 64);

        context.restore();
    }
}