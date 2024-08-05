import Engine from "../../core/engine";
import Instruction from "../baseInstructions/instruction";
import Chart from "../chart/chart";

export default class ModeInstruction extends Instruction {
    public static readonly id = 'mode';

    public modeId: string;

    constructor() {
        super(ModeInstruction.id);
    }

    public load(chart: Chart, args: string[]): void {
        this.modeId = args[0];
        Engine.chartLoader.loadMode(this.modeId);
    }

    public execute(chart: Chart): void {
        Engine.chartLoader.loadMode(this.modeId);
    }
}