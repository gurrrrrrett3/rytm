import Engine from "../../core/engine";
import Lerp from "../../util/math/lerp";

export default class AudioVisualizer {

    public analyser: AnalyserNode;
    public bufferLength: number;
    public dataArray: Uint8Array;

    constructor(audioContext: AudioContext, audioSource: MediaElementAudioSourceNode) {

        this.analyser = audioContext.createAnalyser();

        audioSource.connect(this.analyser);
        this.analyser.connect(audioContext.destination);

        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    public render(context: CanvasRenderingContext2D): void {

        this.analyser.getByteFrequencyData(this.dataArray);

        const barWidth = (Engine.uiManager.playfieldScreenSize.width / this.bufferLength) * 2.5;
        let x = Engine.uiManager.playfieldOffset.x;

        this.dataArray.forEach((data, i) => {
            const barHeight = data

            context.fillStyle = `rgb(${data},${data},${data})`;
            context.fillRect(x, 0, barWidth, barHeight);

            x += barWidth + 1;
        });
    }


}