import { Note } from "./main";
declare function InitPlay(notes: Note[]): void;
declare function PlayFull(aContext: AudioContext, startTime: number, sound: AudioBuffer, tempo: number, volume: number, notes: Note[], notifyStop: () => void): void;
declare function PlaySequence(aContext: AudioContext, startTime: number, sound: AudioBuffer, tempo: number, volume: number, notifyStop: () => void): void;
declare function StopSequence(): void;
declare function PlayMetronome(aContext: AudioContext, startTime: number, count: number, tempo: number): void;
export { PlaySequence, StopSequence, InitPlay, Note, PlayFull, PlayMetronome };
//# sourceMappingURL=Sinth.d.ts.map