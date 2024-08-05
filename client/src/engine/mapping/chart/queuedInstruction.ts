import Instruction from "../baseInstructions/instruction";

export default class QueuedInstruction {
    constructor(public instruction: Instruction, public time: number, public isLeadUp?: boolean) { }
}