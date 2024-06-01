// main file for SinthV2
import { InitPlay, PlaySequence, StopSequence } from "./Sinth.js";
export var Sinth;
(function (Sinth) {
    function CreateSinth() { }
    Sinth.CreateSinth = CreateSinth;
    function play(sound, tempo) {
        const newContext = new AudioContext();
        PlaySequence(newContext, sound, tempo);
    }
    Sinth.play = play;
    function stop() {
        StopSequence();
    }
    Sinth.stop = stop;
    function initplay() {
        InitPlay();
    }
    Sinth.initplay = initplay;
})(Sinth || (Sinth = {}));
