import Chart from "../chart/chart";

export default abstract class Instruction {
    public static readonly id: string;

    public raw: string;
    public pointer: number;

    constructor(public instruction: string) { }
    public abstract load(chart: Chart, args: string[]): void;
    public abstract execute(chart: Chart): void;
}