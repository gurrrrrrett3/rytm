import UiComponent from "./component/uiComponent";

export default class UiScreen {

    public components: UiComponent[] = [];

    constructor(public id: string) { }

    public update(delta: number): void {
        this.components.forEach(component => {
            component.update(delta);
        });
    }

    public render(context: CanvasRenderingContext2D): void {
        this.components.forEach(component => {
            component.render(context);
        });
    }

    public add(...components: UiComponent[]): void {
        this.components.push(...components);
    }

    public remove(...components: (UiComponent | string)[]): void {
        this.components = this.components.filter(c => components.indexOf(c) === -1 && components.indexOf(c.id) === -1);
    }

}