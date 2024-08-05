import Engine from "../../core/engine";
import Instruction from "../baseInstructions/instruction";
import PreNoteInstruction from "../baseInstructions/preNote";
import QueuedInstruction from "./queuedInstruction";

export default class InstructionQueue {
    public stack: QueuedInstruction[] = [];
    public pointer: number = 0;

    constructor() { }

    public add(instruction: Instruction, beatTime: number): void {
        console.debug(`[queue.add] [${this.stack.length}:${beatTime}] ${instruction.raw}`);
        this.stack.push(new QueuedInstruction(instruction, beatTime));
    }

    public addLeadUp(instruction: PreNoteInstruction, leadUpTime: number): void {
        console.debug(`[queue.addLeadUp] [${this.stack.length}:${leadUpTime}] ${instruction.raw}`);

        const lastNonLeadUpInstruction = this.stack
            .slice()
            .reverse()
            .find(queuedInstruction => !queuedInstruction.isLeadUp);

        const time = lastNonLeadUpInstruction
            ? lastNonLeadUpInstruction.time - leadUpTime
            : leadUpTime;

        instruction.timestamp = time;
        this.stack.push(new QueuedInstruction(instruction, time, true));
    }

    public sort(): void {
        this.stack
            .sort((a, b) => a.time - b.time)
            .forEach((queuedInstruction, index) => {
                queuedInstruction.instruction.pointer = index;
            })
    }

    public execute(): void {
        const currentTime = Engine.audioManager.currentTimeMs / Engine.audioManager.currentSong.beatTime;

        while (this.stack.length > this.pointer && this.stack[this.pointer].time <= currentTime) {
            const queuedInstruction = this.stack[this.pointer];
            if (!queuedInstruction) {
                continue;
            }

            console.debug(`[queue.execute] [${this.pointer}:${queuedInstruction.time}] ${queuedInstruction.instruction.raw || `$${queuedInstruction.instruction.instruction}`}`);
            queuedInstruction.instruction.execute(Engine.chartLoader.chart);
            this.pointer++;
        }
    }
}