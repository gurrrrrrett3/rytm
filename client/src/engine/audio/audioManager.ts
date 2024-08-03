import Engine from "../core/engine";
import Song from "./song";
import Song_femtanyl_KATAMARI from "./songs/femtanyl_katamari";
import Song_goreshit_FineNight from "./songs/goreshit_fineNight";
import AudioVisualizer from "./visualizer/audioVisualizer";

export default class AudioManager {

    public readonly songs = {
        finenight: new Song_goreshit_FineNight(),
        katamari: new Song_femtanyl_KATAMARI()
    }

    public currentSong: Song = this.songs.katamari;
    public audio: HTMLAudioElement;


    public audioVisualizer: AudioVisualizer;
    public audioContext: AudioContext = new AudioContext();

    public async init(): Promise<void> {
        this.audio = await this.currentSong.load();
        this.audio.volume = 0.05

        const audioSource = this.audioContext.createMediaElementSource(this.audio);
        this.audioVisualizer = new AudioVisualizer(this.audioContext, audioSource);

        setTimeout(() => {
            this.play();
            Engine.chartExecutor.execute(Engine.chartLoader.chart);

        }, 3000);
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this.audioVisualizer) {
            this.audioVisualizer.render(context);
        }
    }

    public get currentTime(): number {
        return this.audio ? this.audio.currentTime : 0;
    }

    public get currentTimeMs(): number {
        return this.currentTime * 1000;
    }

    public get duration(): number {
        return this.audio.duration;
    }

    public play(): void {
        this.audio.play();
    }

    public pause(): void {
        this.audio.pause();
    }

    public seek(time: number): void {
        this.audio.currentTime = time;
    }

    public get dataString() {
        return this.currentSong.loaded ? `${this.currentSong.title} - ${this.currentSong.artist} | ${this.currentTime.toFixed(2)} / ${this.duration.toFixed(2)} | ${this.currentSong.beatIndex}` : 'Loading...';
    }

}