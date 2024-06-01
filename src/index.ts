// ** This is the Sinth default testing file ** //
// ** Other Applications will integrate with main.ts ** //
import { Note } from "./Sinth.js";
import { Sinth } from "./main.js";

const playButton = document.getElementById("playbutton") as HTMLButtonElement;
const beatsInput = document.getElementById("beats") as HTMLInputElement;
const tempoInput = document.getElementById("tempo") as HTMLInputElement;
const notesInput = document.getElementById("midinotes") as HTMLInputElement;
const aContext: AudioContext = new AudioContext();
let soundLoaded = false;
let sound: AudioBuffer;
const tempo = 120;
let playing = false;

function LoadSound(path: string): void {
  let aBuffer: Promise<AudioBuffer>;
  fetch(path)
    .then(resp => resp.arrayBuffer())
    .then(aB =>  aBuffer = aContext.decodeAudioData(aB))
    .then(buffer => {
      sound = buffer;
      soundLoaded = true;
      playButton.disabled = false;
      playButton.textContent = "Play";
    });
}
LoadSound('../Assets/A4vH.flac');

function GetNumbers(str: string): number[] {
  const stringArray = str.split(",");
  let nums: number[] = [];
  stringArray.map(e => nums.push(parseFloat(e)));
  return nums;
}

function NotifiedStop(): void {
  playing = false;
  playButton.textContent = "Play";
}

function MakeNotes(): Note[] {
  let notes: Note[] = [];
  const beats = GetNumbers(beatsInput.value);
  const midiNotes = GetNumbers(notesInput.value);
  beats.forEach((b: number, index: number) => {
    let midiNote = 69;
    if (index < midiNotes.length) {
      midiNote = midiNotes[index];
    }
    const newNote: Note = {
      Beat: b,
      MidiNote: midiNote
    }
    notes.push(newNote);
  })

  return notes;
}

playButton.addEventListener("click",
                            () => {
                              if (!playing) {
                                Sinth.initplay(MakeNotes());
                                console.log("Playing Sequence!");
                                playing = true;
                                playButton.textContent = "Stop";
                                Sinth.play(sound, parseInt(tempoInput.value), NotifiedStop);
                              } else {
                                NotifiedStop();
                                Sinth.stop();
                              }
                            });


