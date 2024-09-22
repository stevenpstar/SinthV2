// main file for SinthV2
import {
  InitPlay,
  PlayFull,
  PlayMetronome,
  PlaySequence,
  StopSequence,
} from "./Sinth.js";

export module Sinth {
  export function CreateSinth(): void {}

  export function play(
    aContext: AudioContext,
    sound: AudioBuffer,
    tempo: number,
    volume: number,
    callback: () => void,
  ): void {
    PlaySequence(
      aContext,
      aContext.currentTime,
      sound,
      tempo,
      volume,
      callback,
    );
  }

  export function playFull(
    aContext: AudioContext,
    sound: AudioBuffer,
    tempo: number,
    volume: number,
    notes: Note[],
    callback: () => void,
  ): void {
    PlayFull(
      aContext,
      aContext.currentTime,
      sound,
      tempo,
      volume,
      notes,
      callback,
    );
  }

  export function playMetronome(
    aContext: AudioContext,
    count: number,
    tempo: number,
  ): void {
    PlayMetronome(aContext, aContext.currentTime, count, tempo);
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
