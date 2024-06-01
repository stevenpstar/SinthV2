import { Sinth } from "./main.js";
const playButton = document.getElementById("playbutton");
const beatsInput = document.getElementById("beats");
const tempoInput = document.getElementById("tempo");
const notesInput = document.getElementById("midinotes");
const aContext = new AudioContext();
let soundLoaded = false;
let sound;
const tempo = 120;
let playing = false;
function LoadSound(path) {
    let aBuffer;
    fetch(path)
        .then(resp => resp.arrayBuffer())
        .then(aB => aBuffer = aContext.decodeAudioData(aB))
        .then(buffer => {
        sound = buffer;
        soundLoaded = true;
        playButton.disabled = false;
        playButton.textContent = "Play";
    });
}
LoadSound('../Assets/A4vH.flac');
function GetNumbers(str) {
    const stringArray = str.split(",");
    let nums = [];
    stringArray.map(e => nums.push(parseFloat(e)));
    return nums;
}
function NotifiedStop() {
    playing = false;
    playButton.textContent = "Play";
}
function MakeNotes() {
    let notes = [];
    const beats = GetNumbers(beatsInput.value);
    const midiNotes = GetNumbers(notesInput.value);
    beats.forEach((b, index) => {
        let midiNote = 69;
        if (index < midiNotes.length) {
            midiNote = midiNotes[index];
        }
        const newNote = {
            Beat: b,
            MidiNote: midiNote
        };
        notes.push(newNote);
    });
    return notes;
}
playButton.addEventListener("click", () => {
    if (!playing) {
        Sinth.initplay(MakeNotes());
        console.log("Playing Sequence!");
        playing = true;
        playButton.textContent = "Stop";
        Sinth.play(sound, parseInt(tempoInput.value), NotifiedStop);
    }
    else {
        NotifiedStop();
        Sinth.stop();
    }
});
