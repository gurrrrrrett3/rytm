import AudioManager from "../audio/audioManager";
import InputManager from "../input/inputManager";
import ChartExecutor from "../mapping/chartExector";
import ChartLoader from "../mapping/chartLoader";
import Renderer from "../render/renderer";
import UiManager from "../ui/uiManager";

export default class Engine {

    public static readonly package: string = 'rytm';
    public static readonly version: string = '0.0.1';

    public static running: boolean = false;

    public static renderer: Renderer = new Renderer(document.getElementById('app') as HTMLCanvasElement);
    public static uiManager: UiManager = new UiManager();
    public static inputManager: InputManager = new InputManager();
    public static audioManager: AudioManager = new AudioManager();
    public static chartLoader: ChartLoader = new ChartLoader();
    public static chartExecutor: ChartExecutor = new ChartExecutor();

    public static async init(): Promise<void> {
        this.renderer.init();
        this.audioManager.init();
        this.chartLoader.init();

        window.addEventListener('resize', Engine.resize.bind(Engine));
        this.resize();

        this.running = true;

        setInterval(() => {
            this.update(1000 / 60);
        }, 1000 / 60);


    }

    public static resize(): void {
        this.renderer.resize();
        this.uiManager.resize();
    }

    public static update(delta: number): void {
        this.inputManager.update(delta);
        this.uiManager.update(delta);
    }

}