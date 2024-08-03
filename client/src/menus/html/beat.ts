export default class MenuBeat {

    public static bpm: number = 175;

    public static init() {

        const ms = 60000 / this.bpm;

        setInterval(() => {
            this.beat();
        }, ms);

    }

    public static beat() {
        const elements = document.querySelectorAll('button');

        elements.forEach((element) => {
            element.classList.add('beat');

            setTimeout(() => {
                element.classList.remove('beat');
            }, 100);
        });
    }

}