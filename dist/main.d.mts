declare namespace Sinth {
    function CreateSinth(): void;
    function play(sound: AudioBuffer, tempo: number, callback: () => void): void;
    function stop(): void;
    function initplay(notes: Note[]): void;
}
interface Note {
    Beat: number;
    Duration: number;
    MidiNote: number;
}

export { type Note, Sinth };
