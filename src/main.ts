// main file for SinthV2
import { InitPlay, Note, PlaySequence, StopSequence } from "./Sinth.js";

export module Sinth {
  export function CreateSinth(): void {}

  export function play(sound: AudioBuffer, tempo: number, callback: () => void): void {
    const newContext = new AudioContext();
    PlaySequence(newContext, sound, tempo, callback);
  }

  export function stop(): void {
    StopSequence();
  }

  export function initplay(notes: Note[]): void {
    InitPlay(notes);
  }
}
