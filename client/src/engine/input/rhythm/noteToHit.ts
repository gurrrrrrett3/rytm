import { InputKey } from "../enum/inputKey";

export default class NoteToHit {
    constructor(
        public timestamp: number,
        public startBeatTime: number,
        public endBeatTime: number,
        public verifier: (key: InputKey) => boolean = () => true) { }
}