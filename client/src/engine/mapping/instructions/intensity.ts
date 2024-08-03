import Engine from "../../core/engine";
import Instruction from "../instruction";

export default class IntensityInstruction extends Instruction {
    public static readonly id = 'intensity';

    public intensity: number = 1;

    constructor() {
        super(IntensityInstruction.id);
    }

    public load(chart: any, args: string[]): void {
        this.intensity = parseInt(args[0]);
    }

    public execute(chart: any): void {
        Engine.uiManager.beatIntensity = this.intensity;
    }
}
