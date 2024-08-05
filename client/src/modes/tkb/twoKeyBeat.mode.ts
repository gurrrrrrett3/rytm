import Engine from "../../engine/core/engine";
import { InputKey } from "../../engine/input/enum/inputKey";
import { KeyboardInputMode, MouseInputMode } from "../../engine/input/enum/inputMode";
import BaseMode from "../../engine/mapping/mode/baseMode";
import { Axis } from "../../engine/ui/enum/axis";
import Lerp from "../../engine/util/math/lerp";
import tkb_NoteInstruction from "./instruction/note";

export default class TwoKeyBeatMode extends BaseMode {

    public static readonly tkb_LeadUpTime = 4;
    public static readonly tkb_Leinency = 0.75;

    public notes: {
        [noteHitBeat: number]: InputKey
    } = {};

    constructor() {
        super('tkb', 'Beat (2 key)', {
            keyboardInputMode: KeyboardInputMode.TwoButton,
            mouseInputMode: MouseInputMode.None
        });

        this.addInstructions(
            tkb_NoteInstruction
        )

    }

    public render(context: CanvasRenderingContext2D): void {
        context.fillStyle = "#fff";
        context.font = "16px monospace";

        // bars
        context.fillRect(
            Engine.uiManager.convertSingleToScreenCoordinates(20, Axis.X),
            Engine.uiManager.convertSingleToScreenCoordinates(24, Axis.Y),
            Engine.uiManager.convertSingleToScreenCoordinates(110, Axis.W),
            Engine.uiManager.convertSingleToScreenCoordinates(1, Axis.H)
        )

        context.fillRect(
            Engine.uiManager.convertSingleToScreenCoordinates(20, Axis.X),
            Engine.uiManager.convertSingleToScreenCoordinates(64, Axis.Y),
            Engine.uiManager.convertSingleToScreenCoordinates(110, Axis.W),
            Engine.uiManager.convertSingleToScreenCoordinates(1, Axis.H)
        )

        // hit region

        context.strokeStyle = "#fff";
        context.lineWidth = Engine.uiManager.convertSingleToScreenCoordinates(1, Axis.W);

        context.strokeRect(
            Engine.uiManager.convertSingleToScreenCoordinates(130, Axis.X),
            Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.Y),
            Engine.uiManager.convertSingleToScreenCoordinates(10, Axis.W),
            Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.H)
        )

        context.strokeRect(
            Engine.uiManager.convertSingleToScreenCoordinates(130, Axis.X),
            Engine.uiManager.convertSingleToScreenCoordinates(56, Axis.Y),
            Engine.uiManager.convertSingleToScreenCoordinates(10, Axis.W),
            Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.H)
        )

        context.fillStyle = "#333";


        if (Engine.inputManager.keyboardState[Engine.inputManager.keyOne]) {


            context.fillRect(
                Engine.uiManager.convertSingleToScreenCoordinates(130, Axis.X),
                Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.Y),
                Engine.uiManager.convertSingleToScreenCoordinates(10, Axis.W),
                Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.H)
            )

        }

        if (Engine.inputManager.keyboardState[Engine.inputManager.keyTwo]) {


            context.fillRect(
                Engine.uiManager.convertSingleToScreenCoordinates(130, Axis.X),
                Engine.uiManager.convertSingleToScreenCoordinates(56, Axis.Y),
                Engine.uiManager.convertSingleToScreenCoordinates(10, Axis.W),
                Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.H)
            )

        }

        context.fillStyle = "#fff";


        for (const [noteHitBeat, key] of Object.entries(this.notes)) {

            console.log(noteHitBeat, key)

            const movementPercentage = (Engine.audioManager.currentBeat - Number(noteHitBeat)) / TwoKeyBeatMode.tkb_LeadUpTime

            const x = Engine.uiManager.convertSingleToScreenCoordinates(
                Lerp.lerp(20, 140, movementPercentage) + 120,
                Axis.X
            )

            context.fillText(key == InputKey.KeyOne ? '1' : '2', x, Engine.uiManager.convertSingleToScreenCoordinates(key == InputKey.KeyOne ? 16 : 56, Axis.Y))
            context.fillText(noteHitBeat.toString(), x, Engine.uiManager.convertSingleToScreenCoordinates(key == InputKey.KeyOne ? 16 : 56, Axis.Y) + 16)


            context.fillRect(
                x,
                Engine.uiManager.convertSingleToScreenCoordinates(key == InputKey.KeyOne ? 18 : 58, Axis.Y),
                Engine.uiManager.convertSingleToScreenCoordinates(1, Axis.W),
                Engine.uiManager.convertSingleToScreenCoordinates(12, Axis.H)
            )

            // if (movementPercentage > 1 + OneKeyBeatMode.okb_Leinency) {
            //     this.notes.splice(this.notes.indexOf(noteHitBeat), 1)
            // }

        }

    }

    public noteHit(timestamp: number): void {
        delete this.notes[timestamp]

        console.log('note hit', timestamp)
    }

    public noteMiss(timestamp: number): void {
        delete this.notes[timestamp]
    }
}