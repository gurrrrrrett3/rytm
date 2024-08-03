import { ProfilerStep } from "./profilerStep";

export default class Debug {

    public static enabled: boolean = true;
    public static uiDebugEnabled: boolean = false;

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

    public static profile(step: ProfilerStep) {
        performance.mark(step);
    }

}