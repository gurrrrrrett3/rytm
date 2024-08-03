import Menu from "../menu";
import MenuManager from "../menuManager";
import MainMenu from "./mainMenu";

export default class SettingsMenu extends Menu {

    constructor() {
        super('settings', {
            'back': () => {
                MenuManager.showMenu(new MainMenu());
            }
        });
    }
}