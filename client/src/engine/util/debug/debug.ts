import Engine from "../../core/engine";
import { ProfilerStep } from "./enum/profilerStep";

export default class Debug {

    public static enabled: boolean = true;
    public static uiDebugEnabled: boolean = false;
    public static instructionDebugEnabled: boolean = true;

    public static liveDebugValues: {
        [key: string]: {
            value: any,
            label: string,
            color: string,
            lastUpdated: number
        }
    } = {};

    public static setLiveDebugValue(key: string, value: any, options?: {
        label?: string,
        color?: string
    }) {
        this.liveDebugValues[key] = {
            value,
            label: options?.label || key,
            color: options?.color || '#fff',
            lastUpdated: Date.now()
        };
    }

    public static renderLiveDebugValues(context: CanvasRenderingContext2D) {
        if (!this.enabled) return;

        const height = Object.keys(this.liveDebugValues).length * 20 + 10;
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, 200, height);

        Object.entries(this.liveDebugValues).forEach(([key, value], index) => {
            context.fillStyle = value.color;
            context.font = '12px monospace';
            context.fillText(`${value.label}: ${value.value}`, 10, 20 + (index * 20));

            if (Date.now() - value.lastUpdated > 1000) {
                delete this.liveDebugValues[key];
            }
        })
    }

    public static renderInstructionDebug(context: CanvasRenderingContext2D) {
        if (!this.enabled || !this.instructionDebugEnabled || !Engine.chartLoader.chart) return;

        context.font = '12px monospace';

        for (let ptr = Math.max(Engine.chartExecutor.pointer - 10, 0); ptr < Math.min(Engine.chartExecutor.pointer + 10, Engine.chartLoader.chart!.instructions.length); ptr++) {
            context.fillStyle = ptr < Engine.chartExecutor.pointer ? '#888' : ptr === Engine.chartExecutor.pointer ? '#fff' : '#444';
            context.fillText(`${ptr.toString().padEnd(4)} ${Engine.chartLoader.chart!.instructions[ptr].raw}`, 10, Engine.renderer.getCanvas().height - 300 + (ptr - Engine.chartExecutor.pointer) * 20);
        }

    }

    public static profile(step: ProfilerStep) {
        performance.mark(step);
    }

}