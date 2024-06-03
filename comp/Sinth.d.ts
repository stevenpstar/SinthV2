import { Note } from "./main";
declare function InitPlay(notes: Note[]): void;
declare function PlaySequence(aContext: AudioContext, sound: AudioBuffer, tempo: number, notifyStop: () => void): void;
declare function StopSequence(): void;
export { PlaySequence, StopSequence, InitPlay, Note };
//# sourceMappingURL=Sinth.d.ts.map