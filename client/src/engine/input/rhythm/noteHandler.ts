import Engine from "../../core/engine";
import Debug from "../../util/debug/debug";
import { InputKey } from "../enum/inputKey";
import NoteToHit from "./noteToHit";

export default class NoteHandler {
    public currentNotes: NoteToHit[] = [];
    public combo: number = 0;

    public handleKeyDown(key: InputKey) {
        this.currentNotes.forEach(note => {
            if (
                Engine.audioManager.currentTimeMs / Engine.audioManager.currentSong.beatTime >= note.startBeatTime
                && Engine.audioManager.currentTimeMs / Engine.audioManager.currentSong.beatTime <= note.endBeatTime
                && note.verifier(key)
            ) {
                this.hit(note);
            }
        });
    }

    public update() {
        const notesToRemove: NoteToHit[] = [];
        this.currentNotes.forEach(note => {
            if (Engine.audioManager.currentTimeMs / Engine.audioManager.currentSong.beatTime > note.endBeatTime) {
                notesToRemove.push(note);
                this.miss(note);
            }
        });

        this.currentNotes.splice(0, notesToRemove.length);
    }

    public hit(note: NoteToHit) {
        this.currentNotes.splice(this.currentNotes.indexOf(note), 1);
        this.combo++;

        Engine.chartLoader.currentMode?.noteHit(note.timestamp);

        Debug.setLiveDebugValue("combo", this.combo.toString());
    }

    public miss(note: NoteToHit) {
        this.currentNotes.splice(this.currentNotes.indexOf(note), 1);
        this.combo = 0;

        Engine.chartLoader.currentMode?.noteMiss(note.timestamp);

        Debug.setLiveDebugValue("combo", this.combo.toString());
    }
}