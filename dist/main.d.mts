declare namespace Sinth {
    function CreateSinth(): void;
    function play(aContext: AudioContext, sound: AudioBuffer, tempo: number, volume: number, callback: () => void): void;
    function playFull(aContext: AudioContext, sound: AudioBuffer, tempo: number, volume: number, notes: Note[], callback: () => void): void;
    function playMetronome(aContext: AudioContext, count: number, tempo: number): void;
    function stop(): void;
    function initplay(notes: Note[]): void;
}
interface Note {
    Beat: number;
    Duration: number;
    MidiNote: number;
    sheetNote: any;
}

export { type Note, Sinth };
