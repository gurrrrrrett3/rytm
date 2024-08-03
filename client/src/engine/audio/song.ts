export default class Song {

    public loaded = false;
    public audio: HTMLAudioElement;

    constructor(public id: string, public title: string, public artist: string, public bpm: number, public url: string) { }

    public get beatTime(): number {
        return 60000 / this.bpm;
    }

    public get beatCount(): number {
        return (this.audio.duration | 0) / this.beatTime;
    }

    public get beatIndex(): number {
        return Math.floor((this.audio.currentTime * 1000) / this.beatTime);
    }

    public get durationPercent(): number {
        return this.audio ? this.audio.currentTime / this.audio.duration : 0;
    }

    public get timeUntilNextBeat(): number {
        return this.audio ? this.beatTime - (this.audio.currentTime * 1000 % this.beatTime) : 0;
    }

    public get timeUntilNextBeatPercent(): number {
        return this.timeUntilNextBeat / this.beatTime;
    }

    public async load(): Promise<HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            this.audio = new Audio(this.url);
            this.audio.addEventListener('canplaythrough', () => {
                this.loaded = true;
                resolve(this.audio);
            });
        });
    }

}