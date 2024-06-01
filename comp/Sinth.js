const lookAhead = 25.0;
const scheduleAheadTime = 0.1;
let notesInQueue = [];
let noteIndex = 0;
let timerID;
function InitPlay(notes) {
    notesInQueue = notes;
    noteIndex = 0;
}
let play = false;
function PlaySequence(aContext, sound, tempo, notifyStop) {
    const secondsPerBeat = 60.0 / tempo;
    play = true;
    const nextBeat = (notesInQueue[noteIndex].Beat - 1) * secondsPerBeat;
    if (aContext.currentTime + scheduleAheadTime >= nextBeat) {
        scheduleNote(aContext, nextBeat, sound, notesInQueue[noteIndex], secondsPerBeat);
        noteIndex++;
        if (noteIndex >= notesInQueue.length) {
            StopSequence();
            notifyStop();
        }
    }
    if (play) {
        timerID = setTimeout(() => PlaySequence(aContext, sound, tempo, notifyStop), lookAhead);
    }
}
function StopSequence() {
    clearTimeout(timerID);
    noteIndex = 0;
    play = false;
}
function scheduleNote(aContext, time, sound, note, secondsPerBeat) {
    const source = aContext.createBufferSource();
    const gainNode = aContext.createGain();
    gainNode.gain.setValueAtTime(0.25, time);
    source.buffer = sound;
    source.playbackRate.value = GetPlaybackRate(69, note.MidiNote);
    source.connect(gainNode).connect(aContext.destination);
    source.start(time);
    gainNode.gain.linearRampToValueAtTime(0, time + (note.Duration * secondsPerBeat));
}
function GetPlaybackRate(sampleNote = 69, desiredNote) {
    return Math.pow(2, ((desiredNote - sampleNote) / 12));
}
export { PlaySequence, StopSequence, InitPlay };
