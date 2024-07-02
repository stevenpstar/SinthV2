import { Note } from "./main";
declare function InitPlay(notes: Note[]): void;
declare function PlayFull(aContext: AudioContext, sound: AudioBuffer, tempo: number, notes: Note[], notifyStop: () => void): void;
declare function PlaySequence(aContext: AudioContext, sound: AudioBuffer, tempo: number, notifyStop: () => void): void;
declare function StopSequence(): void;
declare function PlayMetronome(aContext: AudioContext, count: number, tempo: number): void;
export { PlaySequence, StopSequence, InitPlay, Note, PlayFull, PlayMetronome };
//# sourceMappingURL=Sinth.d.ts.map