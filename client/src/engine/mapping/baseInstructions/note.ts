import Chart from "../chart/chart";
import Instruction from "./instruction";
import PreNoteInstruction from "./preNote";

export default class NoteInstruction extends Instruction {
    constructor(public id: string, public preNoteInstruction: PreNoteInstruction, public leadUpTime: number, public leniency: number) {
        super(id);
    }

    public load(chart: Chart, args: string[]): void {
        // also queue up the preNoteInstruction with the leadUpTime
        chart.queue.addLeadUp(this.preNoteInstruction, this.leadUpTime);
    }

    public execute(chart: Chart): void {

    }
}