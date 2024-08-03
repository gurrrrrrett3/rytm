import UiComponent from "./uiComponent";

export default class UiGroup extends UiComponent {

    constructor(
        id: string,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        super(id, 'group', x, y, width, height);
    }

    public update(delta: number): void {
        this.children.forEach(component => {
            component.update(delta);
        });
    }

    public render(context: CanvasRenderingContext2D): void {
        super.render(context);

        this.children.forEach(component => {
            component.render(context);
        });
    }

    public add(...components: UiComponent[]): void {
        this.children.push(...components.map(c => {
            c.parent = this;
            return c;
        }));
    }

    public remove(...components: UiComponent[]): void {
        this.children = this.children.filter(c => components.indexOf(c) === -1);
        components.forEach(c => c.parent = undefined);
    }

}