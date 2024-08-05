import Engine from "../core/engine";

export default class KeyboardShortcuts {

    public static readonly shortcuts: { [key: string]: () => void | Promise<void> } = {
        "right": () => {
            Engine.audioManager.seek(Engine.audioManager.audio.currentTime + 5);
        },
        "left": () => {
            Engine.audioManager.seek(Engine.audioManager.audio.currentTime - 5);
        },
    }

    public static readonly shorthands: { [key: string]: string } = {
        'Control': 'ctrl',
        'Shift': 'shift',
        'Alt': 'alt',
        ' ': 'space',
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
    }

    public static async handleShortcut(keyboardState: {
        [key: string]: boolean;
    }, event: KeyboardEvent): Promise<void> {
        const enabledKeys = Object.keys(keyboardState).filter(key => keyboardState[key]).map(key => KeyboardShortcuts.shorthands[key] || key).join(' ');
        const shortcut = KeyboardShortcuts.shortcuts[enabledKeys];
        if (shortcut) {
            await shortcut();
            event.preventDefault();
        }
    }

}