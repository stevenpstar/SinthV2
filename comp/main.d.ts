export declare namespace Sinth {
    function CreateSinth(): void;
    function play(sound: AudioBuffer, tempo: number, callback: () => void): void;
    function stop(): void;
    function initplay(notes: Note[]): void;
}
export interface Note {
    Beat: number;
    Duration: number;
    MidiNote: number;
}
//# sourceMappingURL=main.d.ts.map