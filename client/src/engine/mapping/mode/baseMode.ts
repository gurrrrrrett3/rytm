import Engine from "../../core/engine";
import { KeyboardInputMode, MouseInputMode } from "../../input/enum/inputMode";
import Instruction from "../baseInstructions/instruction";

export default class BaseMode {

    public instructions: typeof Instruction[] = [];

    constructor(public id: string, public name: string, public options: {
        keyboardInputMode: KeyboardInputMode,
        mouseInputMode: MouseInputMode
    }) { }

    public addInstructions(...instructions: typeof Instruction[]): void {
        this.instructions.push(...instructions);
    }

    public registerInstructions(): void {
        for (const instruction of this.instructions) {
            Engine.chartLoader.registerInstruction(instruction, true);
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        // do nothing
    }

    public noteHit(timestamp: number): void {
        // do nothing
    }

    public noteMiss(timestamp: number): void {
        // do nothing
    }


}