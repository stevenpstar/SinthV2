import { Sinth } from "../dist/main.mjs";
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
        .then((resp) => resp.arrayBuffer())
        .then((aB) => (aBuffer = aContext.decodeAudioData(aB)))
        .then((buffer) => {
        sound = buffer;
        soundLoaded = true;
        playButton.disabled = false;
        console.log("Playbutton is not disabled");
        playButton.textContent = "Play";
    });
}
LoadSound("../Assets/A4vH.flac");
function GetNumbers(str) {
    const stringArray = str.split(",");
    let nums = [];
    stringArray.map((e) => nums.push(parseFloat(e)));
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
            Duration: 2,
            MidiNote: midiNote,
            sheetNote: null,
        };
        notes.push(newNote);
    });
    return notes;
}
playButton.addEventListener("click", () => {
    console.log("LOG SOMETHING");
    if (!playing) {
        Sinth.initplay(MakeNotes());
        playing = true;
        playButton.textContent = "Stop";
        Sinth.play(aContext, sound, parseInt(tempoInput.value), 100, NotifiedStop);
    }
    else {
        NotifiedStop();
        Sinth.stop();
    }
});
