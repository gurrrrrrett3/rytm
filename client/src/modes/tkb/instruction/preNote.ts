import Engine from "../../../engine/core/engine";
import { InputKey } from "../../../engine/input/enum/inputKey";
import NoteToHit from "../../../engine/input/rhythm/noteToHit";
import PreNoteInstruction from "../../../engine/mapping/baseInstructions/preNote";
import Chart from "../../../engine/mapping/chart/chart";
import TwoKeyBeatMode from "../twoKeyBeat.mode";

export default class tkb_PreNoteInstruction extends PreNoteInstruction {

    public key: InputKey

    constructor() {
        super();
    }

    public load(chart: Chart, args: string[]): void {
        this.raw = `${tkb_PreNoteInstruction.id} ${this.timestamp}`;
    }

    public override execute(chart: Chart): void {

        // add input to queue

        const noteToHit = new NoteToHit(
            this.timestamp + TwoKeyBeatMode.tkb_LeadUpTime,
            this.timestamp + TwoKeyBeatMode.tkb_LeadUpTime - TwoKeyBeatMode.tkb_Leinency / 2,
            this.timestamp + TwoKeyBeatMode.tkb_LeadUpTime + TwoKeyBeatMode.tkb_Leinency / 2,
            (key) => key == this.key
        )

        Engine.inputManager.noteHandler.currentNotes.push(noteToHit);

        if (!Engine.chartLoader.currentMode) {
            console.error("No mode loaded");
            return
        }

        // add to display

        (Engine.chartLoader.currentMode as TwoKeyBeatMode).notes[this.timestamp] = this.key;

        console.log((Engine.chartLoader.currentMode as TwoKeyBeatMode).notes)
    }
}