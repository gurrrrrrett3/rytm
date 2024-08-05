import Chart from "../chart/chart";
import Instruction from "./instruction";

export default class PreNoteInstruction extends Instruction {
    public static readonly id = 'prenote';

    public timestamp: number;

    constructor() {
        super(PreNoteInstruction.id);
    }

    public load(chart: Chart, args: string[]): void {

    }

    public execute(chart: Chart): void {

    }
}