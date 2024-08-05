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

    public static renderDebug(context: CanvasRenderingContext2D) {
        this.renderLiveDebugValues(context);
        this.renderInstructionDebug(context);
        this.renderNoteHitDebug(context);
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

        for (let ptr = Math.max(Engine.chartLoader.chart.queue.pointer - 10, 0); ptr < Math.min(Engine.chartLoader.chart.queue.pointer + 10, Engine.chartLoader.chart!.queue.stack.length); ptr++) {
            context.fillStyle = ptr < Engine.chartLoader.chart.queue.pointer ? '#888' : ptr === Engine.chartLoader.chart.queue.pointer ? '#fff' : '#444';
            context.fillText(`${ptr.toString().padEnd(4)} ${Engine.chartLoader.chart!.queue.stack[ptr].instruction.raw || `$${Engine.chartLoader.chart!.queue.stack[ptr].instruction.instruction}`}`, 10, Engine.renderer.getCanvas().height - 300 + (ptr - Engine.chartLoader.chart.queue.pointer) * 20);
        }
    }

    public static renderNoteHitDebug(context: CanvasRenderingContext2D) {
        if (!this.enabled) return;

        // context.fillStyle = '#f00';
        // context.fillRect(10, Engine.renderer.getCanvas().height - 600, 100, 100);

        Engine.inputManager.noteHandler.currentNotes.forEach(note => {

            const y = Engine.renderer.getCanvas().height - 600 + (note.startBeatTime - Engine.audioManager.currentBeat) * 5;

            context.fillStyle = Engine.audioManager.currentBeat > note.startBeatTime && Engine.audioManager.currentBeat < note.endBeatTime ? '#0f0' : '#f00';
            context.fillRect(10, y, 100, 2);

        })


    }



    public static profile(step: ProfilerStep) {
        performance.mark(step);
    }

}