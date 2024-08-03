export default class Menu {
    constructor(public id: string, public actions: {
        [key: string]: () => void;
    }) { }

    public show() {
        const menu = document.getElementById(`menu_${this.id}`);
        if (menu) {
            menu.classList.remove('disabled');
            menu.classList.add('enabled');
        }
    }

    public hide() {
        const menu = document.getElementById(`menu_${this.id}`);
        if (menu) {
            menu.classList.remove('enabled');
            menu.classList.add('disabled');

        }
    }
}