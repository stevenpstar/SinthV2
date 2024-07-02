// main file for SinthV2
import { InitPlay, PlayFull, PlayMetronome, PlaySequence, StopSequence } from "./Sinth.js";

export module Sinth {
  export function CreateSinth(): void {}

  export function play(sound: AudioBuffer, tempo: number, callback: () => void): void {
    const newContext = new AudioContext();
    PlaySequence(newContext, sound, tempo, callback);
  }

  export function playFull(sound: AudioBuffer, tempo: number, notes: Note[], callback: () => void): void {
    const newContext = new AudioContext();
    PlayFull(newContext, sound, tempo, notes, callback);
  }

  export function playMetronome(count: number, tempo: number): void {
    const newContext = new AudioContext();
    PlayMetronome(newContext, count, tempo);
  }

  export function stop(): void {
    StopSequence();
  }

  export function initplay(notes: Note[]): void {
    InitPlay(notes);
  }
}

export interface Note {
  Beat: number;
  Duration: number;
  MidiNote: number;
}

