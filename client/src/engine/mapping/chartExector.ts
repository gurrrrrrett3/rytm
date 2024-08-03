import Engine from "../core/engine";
import Chart from "./chart";
import BeatInstruction from "./instructions/beat";

export default class ChartExecutor {

    public pointer: number = 0;
    public nextCallbackTime: number = 0;
    public nextCallback?: () => void;

    public execute(chart: Chart): void {
        const instruction = chart.instructions[this.pointer];

        if (instruction) {

            console.log(`Executing instruction [${this.pointer}] ${instruction.instruction}`);

            switch (instruction.instruction) {

                // hardcoded instructions

                case 'beat':
                    const ins = instruction as BeatInstruction

                    if (ins.beatsToWait == 0) {
                        const timeToWait = Engine.audioManager.currentSong.beatTime - Engine.audioManager.currentTimeMs % Engine.audioManager.currentSong.beatTime;
                        console.log(`Waiting for next beat (${timeToWait}ms)`);

                        this.nextCallbackTime = Engine.audioManager.currentTimeMs + timeToWait;
                        this.nextCallback = () => {
                            this.pointer++;
                            this.execute(chart);
                        }

                        break;
                    } else {
                        const timeToWait = Engine.audioManager.currentSong.beatTime * ins.beatsToWait;
                        console.log(`Waiting for ${ins.beatsToWait} beats (${timeToWait}ms)`);

                        console.log(`next callback at ${Engine.audioManager.currentTimeMs + timeToWait}`);

                        this.nextCallbackTime = Engine.audioManager.currentTimeMs + timeToWait;
                        this.nextCallback = () => {
                            this.pointer++;
                            this.execute(chart);
                        }
                    }

                    break;


                // all other instructions

                default:
                    instruction.execute(chart);
                    this.pointer++;

                    this.execute(chart);
                    break;
            }
        }
    }

    /**
     * while not actually rendering anything, this function is called every frame
     */
    public render(context: CanvasRenderingContext2D): void {
        if (Engine.audioManager.currentTimeMs >= this.nextCallbackTime && this.nextCallback) {
            console.log(`Executing callback at ${Engine.audioManager.currentTime}`);
            this.nextCallback();
            // this.nextCallback = undefined
            // this.nextCallbackTime = 0;
        }
    }
}