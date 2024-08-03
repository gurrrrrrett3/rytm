import Engine from "../core/engine";
import Debug from "../util/debug/debug";
import { ProfilerStep } from "../util/debug/enum/profilerStep";
import { FrameTimerMode } from "./enum/frameTimerMode";
import GradientStorage from "./gradients/gradientStorage";

export default class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public time: number = 0;
    public delta: number = 0;
    public fps: number = 0;

    public fpsSamples: number[] = [];
    public avgFps: number = 0;

    public frameTimerMode: FrameTimerMode = FrameTimerMode.RequestAnimationFrame;
    public frameTimer: number = 10 // ms per frame

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
    }

    public init(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.render(0);
    }

    public render(time: number): void {
        this.delta = time - this.time;
        this.time = time
        this.fps = 1000 / this.delta;

        this.fpsSamples.push(this.fps);
        if (this.fpsSamples.length > 60) {
            this.fpsSamples.shift();
        }

        this.avgFps = this.fpsSamples.reduce((a, b) => a + b, 0) / this.fpsSamples.length;

        Debug.profile(ProfilerStep.BeginFrame)

        this.clear();

        Debug.setLiveDebugValue("fps", this.fps.toFixed(2));
        Debug.setLiveDebugValue("delta", this.delta.toFixed(2));

        Engine.chartExecutor.render(this.context);
        Engine.audioManager.render(this.context);
        Engine.uiManager.render(this.context);
        Engine.inputManager.render(this.context);

        Debug.renderLiveDebugValues(this.context);
        Debug.renderInstructionDebug(this.context);

        Debug.profile(ProfilerStep.EndFrame)

        switch (this.frameTimerMode) {
            case FrameTimerMode.RequestAnimationFrame:
                requestAnimationFrame(this.render.bind(this));
                break;
            case FrameTimerMode.Timeout:
                setTimeout(() => {
                    this.render(performance.now());
                }, this.frameTimer);
                break;
            case FrameTimerMode.Unlocked:
                setTimeout(() => {
                    this.render(performance.now());
                }, 0);
                break;

        }
    }

    public resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public clear(): void {
        this.context.fillStyle = GradientStorage.gradients.bgBeat.getGradient(Engine.audioManager.currentSong.timeUntilNextBeatPercent * Engine.uiManager.beatIntensity / 2)
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }
}