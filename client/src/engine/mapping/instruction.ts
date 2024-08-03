import Chart from "./chart";

export default abstract class Instruction {
    public static readonly id: string;

    constructor(public instruction: string) { }
    public abstract load(chart: Chart, args: string[]): void;
    public abstract execute(chart: Chart): void;
}