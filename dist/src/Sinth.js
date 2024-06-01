// Prototyping
const lookAhead = 25.0;
const scheduleAheadTime = 0.1;
const notesInQueue = [
    1, 1.25, 1.5, 2, 3, 4
];
let noteIndex = 0;
let timerID;
function InitPlay() {
    noteIndex = 0;
}
let play = false;
function PlaySequence(aContext, sound, tempo) {
    const secondsPerBeat = 60.0 / tempo;
    play = true;
    const nextBeat = (notesInQueue[noteIndex] - 1) * secondsPerBeat;
    if (aContext.currentTime + scheduleAheadTime >= nextBeat) {
        scheduleNote(aContext, nextBeat, sound);
        noteIndex++;
        if (noteIndex >= notesInQueue.length) {
            StopSequence();
        }
    }
    if (play) {
        timerID = setTimeout(() => PlaySequence(aContext, sound, tempo), lookAhead);
    }
}
function StopSequence() {
    clearTimeout(timerID);
    noteIndex = 0;
    play = false;
}
function scheduleNote(aContext, time, sound) {
    const source = aContext.createBufferSource();
    source.buffer = sound;
    source.connect(aContext.destination);
    source.start(time);
}
export { PlaySequence, StopSequence, InitPlay };
