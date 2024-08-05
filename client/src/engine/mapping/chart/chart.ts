import InstructionQueue from "./instructionQueue";
import { ChartMeta } from "../types/chartMeta";

export default class Chart {
    public meta: Partial<ChartMeta> = {};
    public queue: InstructionQueue = new InstructionQueue();

    constructor(public id: string) { }

}