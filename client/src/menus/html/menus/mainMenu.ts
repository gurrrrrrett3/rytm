import Engine from "../../../engine/core/engine";
import Menu from "../menu";
import MenuManager from "../menuManager";
import GameMenu from "./gameMenu";
import SettingsMenu from "./settingsMenu";

export default class MainMenu extends Menu {

    constructor() {
        super('mainmenu', {
            'start': () => {
                MenuManager.showMenu(new GameMenu());
                setTimeout(() => {
                    Engine.init();
                }, 1000);
            },
            'settings': () => {
                MenuManager.showMenu(new SettingsMenu());
            }
        });
    }

}