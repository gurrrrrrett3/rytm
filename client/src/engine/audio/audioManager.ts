import Engine from "../core/engine";
import Song from "./song";
import AudioVisualizer from "./visualizer/audioVisualizer";

export default class AudioManager {

    public currentSong: Song;
    public audio: HTMLAudioElement;

    public audioVisualizer: AudioVisualizer;
    public audioContext: AudioContext = new AudioContext();

    public async init(): Promise<void> {
        this.audio = await this.currentSong.load();
        this.audio.volume = 0.1

        const audioSource = this.audioContext.createMediaElementSource(this.audio);
        this.audioVisualizer = new AudioVisualizer(this.audioContext, audioSource);

        setTimeout(() => {
            this.play();
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

    public get currentBeat(): number {
        return this.currentSong ? this.currentTimeMs / this.currentSong.beatTime : 0;
    }

    public get duration(): number {
        return this.audio ? this.audio.duration : 0;
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
        return this.currentSong ? `${this.currentSong.title} - ${this.currentSong.artist} | ${this.currentTime.toFixed(2)} / ${this.duration.toFixed(2)} | ${this.currentSong.beatIndex}` : 'Loading...';
    }

}