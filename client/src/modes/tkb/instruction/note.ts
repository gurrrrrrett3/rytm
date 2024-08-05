import { InputKey } from "../../../engine/input/enum/inputKey";
import NoteInstruction from "../../../engine/mapping/baseInstructions/note";
import Chart from "../../../engine/mapping/chart/chart";
import TwoKeyBeatMode from "../twoKeyBeat.mode";
import tkb_PreNoteInstruction from "./preNote";

export default class tkb_NoteInstruction extends NoteInstruction {

    public static readonly id = "note";

    public key: InputKey

    constructor() {
        super(tkb_NoteInstruction.id, new tkb_PreNoteInstruction(), TwoKeyBeatMode.tkb_LeadUpTime, TwoKeyBeatMode.tkb_Leinency);
    }


    public load(chart: Chart, args: string[]): void {
        super.load(chart, args)
        this.key = parseInt(args[0]) as InputKey
        (this.preNoteInstruction as tkb_PreNoteInstruction).key = this.key
    }

}
