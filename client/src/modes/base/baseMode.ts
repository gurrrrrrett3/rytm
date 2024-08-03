import { KeyboardInputMode, MouseInputMode } from "../../engine/input/enum/inputMode";

export default class BaseMode {
    constructor(public id: string, public name: string, public options: {
        keyboardInputMode: KeyboardInputMode,
        mouseInputMode: MouseInputMode
    }) { }
}