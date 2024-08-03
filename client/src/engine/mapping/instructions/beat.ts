import Chart from "../chart";
import Instruction from "../instruction";

/**
 * Waits for a certain number of beats before executing the next instruction
 * if the beat is 0, it will wait for the next full beat
 */
export default class BeatInstruction extends Instruction {

    public static readonly id = 'beat';

    public beatsToWait: number = 0;

    constructor(public beat: number) {
        super(BeatInstruction.id);
    }

    public load(chart: Chart, args: string[]): void {
        this.beatsToWait = parseInt(args[0]);
    }

    public execute(chart: Chart): void {
        console.log(`Waiting for ${this.beatsToWait} beats`);
    }
}