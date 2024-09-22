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
function PlayFull(aContext, startTime, sound, tempo, volume, notes, notifyStop) {
    const spb = 60.0 / tempo;
    let nIndex = 0;
    notes.forEach((n, i) => scheduleNote(aContext, startTime + (notes[i].Beat - 1) * spb, sound, n, spb, volume));
    notifyStop();
}
function PlaySequence(aContext, startTime, sound, tempo, volume, notifyStop) {
    const secondsPerBeat = 60.0 / tempo;
    play = true;
    const nextBeat = startTime + (notesInQueue[noteIndex].Beat - 1) * secondsPerBeat;
    if (aContext.currentTime + scheduleAheadTime >= nextBeat) {
        scheduleNote(aContext, nextBeat, sound, notesInQueue[noteIndex], secondsPerBeat, volume);
        noteIndex++;
        if (noteIndex >= notesInQueue.length) {
            StopSequence();
            notifyStop();
        }
    }
    if (play) {
        timerID = setTimeout(() => PlaySequence(aContext, startTime, sound, tempo, volume, notifyStop), lookAhead);
    }
}
function StopSequence() {
    clearTimeout(timerID);
    noteIndex = 0;
    play = false;
}
function scheduleNote(aContext, time, sound, note, secondsPerBeat, volume) {
    // MAX VOLUME = 0.25
    // MIN VOLUME = 0.0
    const perc = volume / 100;
    const MAX_VOLUME = 0.25;
    const v = MAX_VOLUME * perc;
    const source = aContext.createBufferSource();
    const gainNode = aContext.createGain();
    gainNode.gain.setValueAtTime(v, time);
    source.buffer = sound;
    source.playbackRate.value = GetPlaybackRate(69, note.MidiNote);
    source.connect(gainNode).connect(aContext.destination);
    source.start(time);
    gainNode.gain.linearRampToValueAtTime(0, time + note.Duration * secondsPerBeat);
}
function GetPlaybackRate(sampleNote = 69, desiredNote) {
    return Math.pow(2, ((desiredNote - sampleNote) / 12));
}
function PlayMetronome(aContext, startTime, count, tempo) {
    const bps = 60 / tempo;
    for (let i = 0; i < count; i++) {
        const timeStart = startTime + bps * i;
        const timeStop = startTime + bps * i + 0.2;
        const osc = aContext.createOscillator();
        const env = aContext.createGain();
        osc.frequency.value = i === 0 ? 600 : 500;
        env.gain.setValueAtTime(0.5, timeStart);
        osc.connect(env).connect(aContext.destination);
        osc.start(timeStart);
        osc.stop(timeStop);
    }
}
export { PlaySequence, StopSequence, InitPlay, PlayFull, PlayMetronome };
