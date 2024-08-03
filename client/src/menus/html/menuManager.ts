import MenuBeat from "./beat";
import Menu from "./menu";
import MainMenu from "./menus/mainMenu";

export default class MenuManager {

    public static currentMenu: Menu = new MainMenu();

    public static showMenu(menu: Menu): void {
        menu.show();
        this.currentMenu.hide();
        this.currentMenu = menu;
    }

    public static init() {
        this.currentMenu.show();
        // MenuBeat.init();

        const menuButtons = document.querySelectorAll('button[data-menu]');

        menuButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const action = target.getAttribute('data-action');

                if (action) {
                    this.currentMenu.actions[action]();
                } else {
                    console.log('No action defined for this button');
                }

            });
        });

    }
}