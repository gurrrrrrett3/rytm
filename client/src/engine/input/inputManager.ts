import Engine from "../core/engine";
import Debug from "../util/debug/debug";
import DefaultMouseCursor from "./cursors/default";
import { KeyboardInputMode, MouseInputMode } from "./enum/inputMode";
import KeyboardShortcuts from "./keyboardShortcuts";
import MouseCursor from "./mouseCursor";

export default class InputManager {

    public mouseInputMode: MouseInputMode = MouseInputMode.Positional
    public keyboardInputMode: KeyboardInputMode = KeyboardInputMode.None;

    public mouseLocked: boolean = false;

    public mousePosition: { x: number, y: number } = { x: 0, y: 0 };
    public playfieldMousePosition: { x: number, y: number } = { x: 0, y: 0 };
    public mouseDelta: { x: number, y: number } = { x: 0, y: 0 };

    public mouseDown: boolean = false;

    public mouseSensitivity: number = 0.7
    public currentMouseCursor: MouseCursor = new DefaultMouseCursor();

    public keyboardState: { [key: string]: boolean } = {};
    public keyboardShortcuts: { [key: string]: () => void } = {};

    constructor() {
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('mousedown', this.onMouseDown.bind(this));
        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('pointerlockchange', () => {
            this.mouseLocked = document.pointerLockElement === Engine.renderer.getCanvas();
        });
    }

    public update(delta: number): void {

    }

    public render(context: CanvasRenderingContext2D): void {
        context.save();


        if (!this.mouseLocked) {
            context.fillStyle = 'white';

            context.font = '48px monospace';
            context.fillText('Click to lock mouse', 100, window.innerHeight - 100);
        } else {
            switch (this.mouseInputMode) {
                case MouseInputMode.Positional:
                    this.currentMouseCursor.render(context, this.mousePosition);
                    break;
            }
        }

        context.restore();
    }

    private onMouseMove(event: MouseEvent): void {

        if (!this.mouseLocked) {
            this.mousePosition = {
                x: event.clientX,
                y: event.clientY
            }

        } else {

            this.mouseDelta = {
                x: event.movementX * this.mouseSensitivity,
                y: event.movementY * this.mouseSensitivity
            };

            this.mousePosition = {
                x: this.mousePosition.x + this.mouseDelta.x,
                y: this.mousePosition.y + this.mouseDelta.y
            }

            if (this.mouseInputMode == MouseInputMode.Positional) {
                this.mousePosition = {
                    x: Math.min(Math.max(Engine.uiManager.playfieldOffset.x, this.mousePosition.x), Engine.uiManager.playfieldScreenSize.width + Engine.uiManager.playfieldOffset.x),
                    y: Math.min(Math.max(Engine.uiManager.playfieldOffset.y, this.mousePosition.y), Engine.uiManager.playfieldScreenSize.height + Engine.uiManager.playfieldOffset.y)
                }
            }
        }


        this.playfieldMousePosition = Engine.uiManager.convertToPlayfieldCoordinates(this.mousePosition.x, this.mousePosition.y);

        Debug.setLiveDebugValue("mouseX", this.playfieldMousePosition.x.toFixed(2));
        Debug.setLiveDebugValue("mouseY", this.playfieldMousePosition.y.toFixed(2));
    }

    private async requestPointerLock(): Promise<void> {

        if (!Engine.running) {
            return;
        }

        // @ts-expect-error
        const promise = Engine.renderer.getCanvas().requestPointerLock({
            unadjustedMovement: true,
        });

        // @ts-expect-error
        if (!promise) {
            console.log("disabling mouse acceleration is not supported");
            return;
        }

        (promise as Promise<void>)
            .then(() => {
                console.log("Pointer lock enabled");
                this.mouseLocked = true;
            })
            .catch((error) => {
                if (error.name === "NotSupportedError") {
                    // Some platforms may not support unadjusted movement.
                    // You can request again a regular pointer lock.
                    return Engine.renderer.getCanvas().requestPointerLock();
                }
            });
    }

    private onMouseDown(event: MouseEvent): void {

        if (!this.mouseLocked) {
            this.requestPointerLock();
        }

        this.mouseDown = true;
    }

    private onMouseUp(event: MouseEvent): void {
        this.mouseDown = false;
    }

    private onKeyDown(event: KeyboardEvent): void {
        this.keyboardState[event.key] = true;

        KeyboardShortcuts.handleShortcut(this.keyboardState, event);
    }

    private onKeyUp(event: KeyboardEvent): void {
        this.keyboardState[event.key] = false;
    }

}