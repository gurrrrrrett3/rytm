export default class Gradient {
    constructor(public colors: string[]) { }

    public getGradient(percentage: number) {
        const index = (this.colors.length - 1) * percentage;
        const lower = this.colors[Math.floor(index)];
        const upper = this.colors[Math.ceil(index)];
        const percent = index % 1;
        return this.interpolate(lower, upper, percent);
    }

    private interpolate(lower: string, upper: string, percentage: number) {
        const lowerRgb = this.hexToRgb(lower);
        const upperRgb = this.hexToRgb(upper);
        const r = Math.floor(lowerRgb.r + (upperRgb.r - lowerRgb.r) * percentage);
        const g = Math.floor(lowerRgb.g + (upperRgb.g - lowerRgb.g) * percentage);
        const b = Math.floor(lowerRgb.b + (upperRgb.b - lowerRgb.b) * percentage);
        return this.rgbToHex(r, g, b);
    }

    private hexToRgb(hex: string) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }

    private rgbToHex(r: number, g: number, b: number) {
        return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
    }

    private componentToHex(c: number) {
        const hex = c.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }

    public static fromHex(colors: string[]) {
        return new Gradient(colors);
    }

}