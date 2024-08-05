import Engine from "../../../engine/core/engine";
import { InputKey } from "../../../engine/input/enum/inputKey";
import NoteToHit from "../../../engine/input/rhythm/noteToHit";
import PreNoteInstruction from "../../../engine/mapping/baseInstructions/preNote";
import Chart from "../../../engine/mapping/chart/chart";
import OneKeyBeatMode from "../oneKeyBeat.mode";

export default class okb_PreNoteInstruction extends PreNoteInstruction {

    constructor() {
        super();
    }

    public load(chart: Chart, args: string[]): void {
        this.raw = `${okb_PreNoteInstruction.id} ${this.timestamp}`;
    }

    public override execute(chart: Chart): void {

        // add input to queue

        const noteToHit = new NoteToHit(
            this.timestamp + OneKeyBeatMode.okb_LeadUpTime,
            this.timestamp + OneKeyBeatMode.okb_LeadUpTime - OneKeyBeatMode.okb_Leinency / 2,
            this.timestamp + OneKeyBeatMode.okb_LeadUpTime + OneKeyBeatMode.okb_Leinency / 2,
            (key) => key == InputKey.KeyOne || key == InputKey.KeyTwo
        )

        Engine.inputManager.noteHandler.currentNotes.push(noteToHit);

        if (!Engine.chartLoader.currentMode) {
            console.error("No mode loaded");
            return
        }

        // add to display

        (Engine.chartLoader.currentMode as OneKeyBeatMode).notes.push(this.timestamp + OneKeyBeatMode.okb_LeadUpTime);
    }
}