import Instruction from "./instruction";
import { ChartMeta } from "./types/chartMeta";

export default class Chart {
    public meta: Partial<ChartMeta> = {};
    public instructions: Instruction[] = [];

    constructor(public id: string) { }



}