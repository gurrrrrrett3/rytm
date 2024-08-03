export default class Lerp {
    public static lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    public static exponential(a: number, b: number, t: number): number {
        return a * Math.pow(b / a, t);
    }

    public static inverseExponential(a: number, b: number, t: number): number {
        return b * Math.pow(a / b, t);
    }

    public static smoothStep(a: number, b: number, t: number): number {
        return Lerp.lerp(a, b, t * t * (3 - 2 * t));
    }

    public static smootherStep(a: number, b: number, t: number): number {
        return Lerp.lerp(a, b, t * t * t * (t * (t * 6 - 15) + 10));
    }

    public static cosine(a: number, b: number, t: number): number {
        return Lerp.lerp(a, b, (1 - Math.cos(t * Math.PI)) / 2);
    }

    public static circular(a: number, b: number, t: number): number {
        return Lerp.lerp(a, b, 1 - Math.sqrt(1 - t * t));
    }

    public static cubicBezier(a: number, b: number, t: number, p0: number, p1: number): number {
        return Lerp.lerp(a, b, (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + t * t * t);
    }

    public static quadraticBezier(a: number, b: number, t: number, p0: number): number {
        return Lerp.lerp(a, b, (1 - t) * (1 - t) * p0 + t * t);
    }
}