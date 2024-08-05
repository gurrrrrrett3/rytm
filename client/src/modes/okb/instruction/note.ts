import NoteInstruction from "../../../engine/mapping/baseInstructions/note";
import OneKeyBeatMode from "../oneKeyBeat.mode";
import okb_PreNoteInstruction from "./preNote";

export default class okb_NoteInstruction extends NoteInstruction {

    public static readonly id = "note";

    constructor() {
        super(okb_NoteInstruction.id, new okb_PreNoteInstruction(), OneKeyBeatMode.okb_LeadUpTime, OneKeyBeatMode.okb_Leinency);
    }

    // rest will be handled by the base class and mode file
}
