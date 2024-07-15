// main file for SinthV2
import { InitPlay, PlayFull, PlayMetronome, PlaySequence, StopSequence } from "./Sinth.js";
export var Sinth;
(function (Sinth) {
    function CreateSinth() { }
    Sinth.CreateSinth = CreateSinth;
    function play(aContext, sound, tempo, callback) {
        PlaySequence(aContext, aContext.currentTime, sound, tempo, callback);
    }
    Sinth.play = play;
    function playFull(aContext, sound, tempo, notes, callback) {
        PlayFull(aContext, aContext.currentTime, sound, tempo, notes, callback);
    }
    Sinth.playFull = playFull;
    function playMetronome(aContext, count, tempo) {
        PlayMetronome(aContext, aContext.currentTime, count, tempo);
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
