import Instruction from "../baseInstructions/instruction";
import Chart from "./chart";
import Engine from "../../core/engine";
import BeatInstruction from "../instructions/beat";
import Song from "../../audio/song";
import BaseMode from "../mode/baseMode";

export default class ChartLoader {

    public instructions: Map<string, any> = new Map();
    public currentModeInstructions: Set<string> = new Set();

    public modes: Map<string, any> = new Map();
    public currentMode: BaseMode | null = null;

    public chart: Chart;

    public registerInstruction(instruction: typeof Instruction, isForMode: boolean = false) {
        // @ts-ignore - register the class so we can instantiate it later
        this.instructions.set(instruction.id, instruction);

        if (isForMode) {
            this.currentModeInstructions.add(instruction.id);
        }
    }

    public registerMode(mode: any) {
        const modeInstance = new mode();
        console.log(`Registered mode ${modeInstance.id}`);
        this.modes.set(modeInstance.id, modeInstance);

    }

    public async loadChart(chartId: string): Promise<Chart> {
        const response = await fetch(`/charts/${chartId}.rytm`);
        const chartText = await response.text();
        const lines = chartText.split('\n');

        let chart = new Chart(chartId);
        this.loadInstructions(chart, lines);

        this.currentMode = null;

        return chart;

    }

    public async loadMode(modeId: string) {
        const mode = this.modes.get(modeId) as BaseMode

        if (mode) {
            for (const instruction of this.currentModeInstructions) {
                this.instructions.delete(instruction);
            }

            this.currentModeInstructions.clear();

            mode.registerInstructions();
            this.currentMode = mode;

            console.log(`Loaded mode ${modeId}`);

        } else {
            console.error(`Mode ${modeId} not found`);
        }


    }

    public loadInstructions(chart: Chart, lines: string[]) {
        let currentBeat = 0;

        console.log(this.instructions)

        for (const line of lines) {

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

                switch (instruction) {
                    case 'beat':
                        const ins = instructionInstance as BeatInstruction;

                        if (ins.beatsToWait == 0) {
                            // round to the next beat
                            currentBeat = Math.floor(currentBeat + 1);
                        } else {
                            currentBeat += ins.beatsToWait;
                        }

                        break;
                }

                chart.queue.add(instructionInstance, currentBeat);

            } else {
                console.error(`Unknown instruction ${instruction}`);
            }
        }

        chart.queue.sort();

        // now that all META instructions are loaded (and technically executed), we can load song data

        Engine.audioManager.currentSong = new Song(
            chart.id,
            chart.meta.title!,
            chart.meta.artist!,
            chart.meta.bpm!,
            chart.meta.path!
        )

        Engine.audioManager.init(); // load the song
    }

    public async init() {
        // @ts-expect-error
        const instructionImports = import.meta.glob('/src/engine/mapping/instructions/*.ts');

        const instructions = await Promise.all(Object.values(instructionImports).map((i) => (i as any)()))

        for (const instruction of instructions) {
            this.registerInstruction(instruction.default);
            console.log(`Registered instruction ${instruction.default.name}`);
        }

        // load modes
        // @ts-ignore
        const modeImports = await import.meta.glob('/src/modes/*/*.mode.ts');

        const modes = await Promise.all(Object.values(modeImports).map((i) => (i as any)()));

        for (const mode of modes) {
            this.registerMode(mode.default);
        }

        // load demo chart
        this.chart = await Engine.chartLoader.loadChart('katamari');

    }

}