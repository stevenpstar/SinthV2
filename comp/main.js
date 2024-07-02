// main file for SinthV2
import { InitPlay, PlayFull, PlayMetronome, PlaySequence, StopSequence } from "./Sinth.js";
export var Sinth;
(function (Sinth) {
    function CreateSinth() { }
    Sinth.CreateSinth = CreateSinth;
    function play(sound, tempo, callback) {
        const newContext = new AudioContext();
        PlaySequence(newContext, sound, tempo, callback);
    }
    Sinth.play = play;
    function playFull(sound, tempo, notes, callback) {
        const newContext = new AudioContext();
        PlayFull(newContext, sound, tempo, notes, callback);
    }
    Sinth.playFull = playFull;
    function playMetronome(count, tempo) {
        const newContext = new AudioContext();
        PlayMetronome(newContext, count, tempo);
    }
    Sinth.playMetronome = playMetronome;
    function stop() {
        StopSequence();
    }
    Sinth.stop = stop;
    function initplay(notes) {
        InitPlay(notes);
    }
    Sinth.initplay = initplay;
})(Sinth || (Sinth = {}));
