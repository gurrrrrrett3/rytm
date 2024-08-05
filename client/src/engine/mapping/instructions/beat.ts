import Chart from "../chart/chart";
import Instruction from "../baseInstructions/instruction";

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
        this.beatsToWait = parseFloat(args[0]) || 0;
    }

    public execute(chart: Chart): void {
        // only needed to build queue on load,
        // so nothing to execute here
    }
}