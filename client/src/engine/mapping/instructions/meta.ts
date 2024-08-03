import Chart from "../chart";
import Instruction from "../instruction";

export default class MetaInstruction extends Instruction {
    public static readonly id = 'meta';

    constructor() {
        super(MetaInstruction.id);
    }

    public load(chart: Chart, args: string[]): void {
        const key = args[0];
        const value = args[1];

        chart.meta[key] = value;

        console.log(`Set meta key ${key} to value ${value}`);
    }

    public execute(chart: Chart): void {
        // do nothing
    }
}