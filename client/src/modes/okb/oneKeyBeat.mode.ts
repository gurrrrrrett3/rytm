import Engine from "../../engine/core/engine";
import { KeyboardInputMode, MouseInputMode } from "../../engine/input/enum/inputMode";
import BaseMode from "../../engine/mapping/mode/baseMode";
import { Axis } from "../../engine/ui/enum/axis";
import Lerp from "../../engine/util/math/lerp";
import okb_NoteInstruction from "./instruction/note";

export default class OneKeyBeatMode extends BaseMode {

    public static readonly okb_LeadUpTime = 6;
    public static readonly okb_Leinency = 0.75;

    public notes: number[] = [];

    constructor() {
        super('okb', 'Beat (1 key)', {
            keyboardInputMode: KeyboardInputMode.OneButton,
            mouseInputMode: MouseInputMode.None
        });

        this.addInstructions(
            okb_NoteInstruction
        )

    }

    public render(context: CanvasRenderingContext2D): void {
        context.fillStyle = "#fff";
        context.font = "16px monospace";

        // bar
        context.fillRect(
            Engine.uiManager.convertSingleToScreenCoordinates(20, Axis.X),
            Engine.uiManager.convertSingleToScreenCoordinates(44, Axis.Y),
            Engine.uiManager.convertSingleToScreenCoordinates(110, Axis.W),
            Engine.uiManager.convertSingleToScreenCoordinates(1, Axis.H)
        )

        // hit region

        context.strokeStyle = "#fff";
        context.lineWidth = Engine.uiManager.convertSingleToScreenCoordinates(1, Axis.W);

        context.strokeRect(
            Engine.uiManager.convertSingleToScreenCoordinates(130, Axis.X),
            Engine.uiManager.convertSingleToScreenCoordinates(36, Axis.Y),
            Engine.uiManager.convertSingleToScreenCoordinates(10, Axis.W),
            Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.H)
        )

        if (Engine.inputManager.keyboardState[Engine.inputManager.keyOne] || Engine.inputManager.keyboardState[Engine.inputManager.keyTwo]) {

            context.fillStyle = "#333";

            context.fillRect(
                Engine.uiManager.convertSingleToScreenCoordinates(130, Axis.X),
                Engine.uiManager.convertSingleToScreenCoordinates(36, Axis.Y),
                Engine.uiManager.convertSingleToScreenCoordinates(10, Axis.W),
                Engine.uiManager.convertSingleToScreenCoordinates(16, Axis.H)
            )

            context.fillStyle = "#fff";
        }

        for (const noteHitBeat of this.notes) {

            const movementPercentage = (Engine.audioManager.currentBeat - noteHitBeat) / OneKeyBeatMode.okb_LeadUpTime

            const x = Engine.uiManager.convertSingleToScreenCoordinates(
                Lerp.lerp(20, 140, movementPercentage) + 120,
                Axis.X
            )

            context.fillRect(
                x,
                Engine.uiManager.convertSingleToScreenCoordinates(38, Axis.Y),
                Engine.uiManager.convertSingleToScreenCoordinates(1, Axis.W),
                Engine.uiManager.convertSingleToScreenCoordinates(12, Axis.H)
            )

            // if (movementPercentage > 1 + OneKeyBeatMode.okb_Leinency) {
            //     this.notes.splice(this.notes.indexOf(noteHitBeat), 1)
            // }

        }

    }

    public noteHit(timestamp: number): void {
        this.notes = this.notes.filter(note => note != timestamp)

        console.log('note hit', timestamp)
    }

    public noteMiss(timestamp: number): void {
        this.notes = this.notes.filter(note => note != timestamp)
    }
}