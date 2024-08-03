import Instruction from "./instruction";
import Chart from "./chart";
import Engine from "../core/engine";

export default class ChartLoader {

    public instructions: Map<string, any> = new Map();
    public chart: Chart;

    public registerInstruction(instruction: typeof Instruction) {
        // @ts-ignore - register the class so we can instantiate it later
        this.instructions.set(instruction.id, instruction);
        // @ts-ignore
        console.log(`Registered instruction ${instruction.id}`);
        console.log(instruction)
    }

    public async loadChart(chartId: string): Promise<Chart> {
        const response = await fetch(`/charts/${chartId}.rytm`);
        const chartText = await response.text();

        const lines = chartText.split('\n');

        console.log(lines)

        let chart = new Chart(chartId);

        this.loadInstructions(chart, lines);

        return chart;

    }

    public loadInstructions(chart: Chart, lines: string[]) {
        for (let line of lines) {

            if (line.startsWith('#') || line.trim() === '') {
                continue;
            }

            const parts = line.split(' ');
            const instruction = parts[0].toLowerCase();
            const args = parts.slice(1);

            // if an arg starts with a #, rest of the line is a comment
            for (let i = 0; i < args.length; i++) {
                if (args[i].startsWith('#')) {
                    args.splice(i, args.length - i);
                    break;
                }
            }

            // if an arg is in quotes, combine it with the next arg
            for (let i = 0; i < args.length; i++) {
                if (args[i].startsWith('"')) {
                    let combined = args[i].substring(1);
                    args.splice(i, 1);

                    while (!combined.endsWith('"')) {
                        combined += ' ' + args[i];
                        args.splice(i, 1);
                    }

                    args[i] = combined.substring(0, combined.length - 1);
                }
            }

            if (this.instructions.has(instruction)) {
                const instructionClass = this.instructions.get(instruction);
                const instructionInstance = new instructionClass() as Instruction;

                instructionInstance.raw = line;
                instructionInstance.load(chart, args);
                chart.instructions.push(instructionInstance);

            } else {
                console.error(`Unknown instruction ${instruction}`);
            }
        }
    }

    public async init() {
        // @ts-expect-error
        const instructionImports = import.meta.glob('./instructions/*.ts');

        const instructions = await Promise.all(Object.values(instructionImports).map((i) => (i as any)()))

        for (const instruction of instructions) {
            this.registerInstruction(instruction.default);
            console.log(`Registered instruction ${instruction.default.name}`);
        }

        // load demo chart
        this.chart = await Engine.chartLoader.loadChart('katamari');

    }

}