import { examples } from './examples.js';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let currentExample = 0;

// Helper to play a single note
function playNote(freq, vol, duration, when = 0) {
    setTimeout(() => {
        // Ensure AudioContext is running (important for some browsers/scenarios)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        if (freq > 0) {
            // Make sure 'vol' is a number; parseFloat can help if it's ever a string.
            const effectiveVol = parseFloat(vol); 

            // Log the effective volume that will be used.
            console.log(`Scheduling note: freq=${freq}Hz, vol=${effectiveVol}, duration=${duration}ms`);
            
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            osc.type = 'sine';
            
            // 'scheduleTime' is the audioContext.currentTime when this setTimeout callback executes.
            // All audio events (frequency, gain, start, stop) are scheduled relative to this time.
            const scheduleTime = audioContext.currentTime;
            const durationSec = duration / 1000;
            
            osc.frequency.setValueAtTime(freq, scheduleTime);
            
            // Set the gain (volume) at the 'scheduleTime'.
            // This line is critical and correctly uses the API.
            gainNode.gain.setValueAtTime(effectiveVol, scheduleTime);
            
            osc.start(scheduleTime);
            osc.stop(scheduleTime + durationSec);
            
            osc.onended = () => {
                osc.disconnect();
                gainNode.disconnect();
            };
        }
    }, when);
}

// Helper to play a melody (array of {freq, vol, duration}), with optional tempo multiplier
function playMelody(melody, tempoMultiplier = 1) {
    let when = 0;
    melody.forEach(note => {
        playNote(note.freq, note.vol, note.duration * tempoMultiplier, when);
        when += note.duration * tempoMultiplier;
    });
}

function playBefore() {
    const ex = examples[currentExample];
    ex.before(playMelody);
}

function playAfter() {
    const ex = examples[currentExample];
    ex.after(playMelody);
}

function askQuestion() {
    const exampleNumber = document.getElementById("example-number");
    if (currentExample < examples.length) {
        exampleNumber.innerText = `Example ${currentExample + 1} of ${examples.length}`;
        const questionElement = document.getElementById("question");
        questionElement.innerText = "Listen and choose the dynamic style of this melody:";
    } else {
        exampleNumber.innerText = "";
        const feedbackElement = document.getElementById("feedback");
        feedbackElement.innerText = "🎉 All examples finished!";
        const questionElement = document.getElementById("question");
        questionElement.innerText = "";
    }
}

function checkAnswer(userAnswer) {
    const feedbackElement = document.getElementById("feedback");
    if (
        userAnswer.toLowerCase() === examples[currentExample].answer.toLowerCase()
    ) {
        feedbackElement.innerText = "✔️";
        currentExample++;
        setTimeout(() => {
            askQuestion();
            feedbackElement.innerText = "";
        }, 1500);
    } else {
        feedbackElement.innerText = "❌";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const beforeBtn = document.getElementById('play-before');
    const afterBtn = document.getElementById('play-after');
    if (beforeBtn) beforeBtn.addEventListener('click', playBefore);
    if (afterBtn) afterBtn.addEventListener('click', playAfter);
    askQuestion();
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const userAnswer = btn.getAttribute('data-answer');
            checkAnswer(userAnswer);
        });
    });
});