// Each example: { melody, before, after, question, answer }
const examples = [
    // 1. Pianissimo example - "Twinkle Twinkle Little Star" (longer)
    {
        baseMelody: [
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 392, vol: 0.05, duration: 400 }, // G4
            { freq: 392, vol: 0.05, duration: 400 }, // G4
            { freq: 440, vol: 0.05, duration: 400 }, // A4
            { freq: 440, vol: 0.05, duration: 400 }, // A4
            { freq: 392, vol: 0.05, duration: 800 }, // G4 (long)
            { freq: 349, vol: 0.05, duration: 400 }, // F4
            { freq: 349, vol: 0.05, duration: 400 }, // F4
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 261, vol: 0.05, duration: 800 }, // C4 (long)
        ],
        before: function(playMelody) {
            playMelody(this.baseMelody, 1);
        },
        after: function(playMelody) {
            const softMelody = this.baseMelody.map(n => ({...n, vol: 0.01})); // EXTREMELY soft
            playMelody(softMelody, 1);
        },
        answer: "pianissimo"
    },
    // 2. Forte example - "Super Mario Bros Main Theme" (longer opening)
    {
        baseMelody: [
            { freq: 659, vol: 0.02, duration: 150 }, // E5
            { freq: 659, vol: 0.02, duration: 150 }, // E5
            { freq: 0,   vol: 0.0, duration: 150 }, // Rest
            { freq: 659, vol: 0.02, duration: 150 }, // E5
            { freq: 0,   vol: 0.0, duration: 150 }, // Rest
            { freq: 523, vol: 0.02, duration: 150 }, // C5
            { freq: 659, vol: 0.02, duration: 150 }, // E5
            { freq: 784, vol: 0.02, duration: 300 }, // G5
            { freq: 0,   vol: 0.0, duration: 300 }, // Rest
            { freq: 392, vol: 0.02, duration: 300 }, // G4
            { freq: 0,   vol: 0.0, duration: 300 }, // Rest
        ],
        before: function(playMelody) {
            playMelody(this.baseMelody, 1);
        },
        after: function(playMelody) {
            const loudMelody = this.baseMelody.map(n => ({...n, vol: n.freq > 0 ? 0.99 : 0})); // MAXIMUM volume for notes
            playMelody(loudMelody, 1);
        },
        answer: "forte"
    },
    // 3. Crescendo example - "Happy Birthday" (full first phrase)
    {
        baseMelody: [
            { freq: 261, vol: 0.05, duration: 300 }, // C4
            { freq: 261, vol: 0.05, duration: 200 }, // C4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 349, vol: 0.05, duration: 400 }, // F4
            { freq: 330, vol: 0.05, duration: 800 }, // E4 (long)
            { freq: 261, vol: 0.05, duration: 300 }, // C4
            { freq: 261, vol: 0.05, duration: 200 }, // C4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 392, vol: 0.05, duration: 400 }, // G4
            { freq: 349, vol: 0.05, duration: 800 }, // F4 (long)
        ],
        before: function(playMelody) {
            playMelody(this.baseMelody, 1);
        },
        after: function(playMelody) {
            const crescendoMelody = this.baseMelody.map((n, i) => ({...n, vol: n.freq > 0 ? 0.01 + (i * 0.04) : 0})); // Gradual increase
            playMelody(crescendoMelody, 1);
        },
        answer: "crescendo"
    },
    // 4. Pianissimo - "Mary Had a Little Lamb" (longer)
    {
        baseMelody: [
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 330, vol: 0.05, duration: 800 }, // E4 (long)
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 294, vol: 0.05, duration: 800 }, // D4 (long)
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 392, vol: 0.05, duration: 400 }, // G4
            { freq: 392, vol: 0.05, duration: 800 }, // G4 (long)
        ],
        before: function(playMelody) {
            playMelody(this.baseMelody, 1);
        },
        after: function(playMelody) {
            const softMelody = this.baseMelody.map(n => ({...n, vol: 0.01})); // EXTREMELY soft
            playMelody(softMelody, 1);
        },
        answer: "pianissimo"
    },
    // 5. Forte - "Zelda Item Get" sound effect style (extended arpeggio)
    {
        baseMelody: [
            { freq: 392, vol: 0.05, duration: 150 }, // G4
            { freq: 523, vol: 0.05, duration: 150 }, // C5
            { freq: 659, vol: 0.05, duration: 150 }, // E5
            { freq: 784, vol: 0.05, duration: 150 }, // G5
            { freq: 1047, vol: 0.05, duration: 150 }, // C6
            { freq: 1319, vol: 0.05, duration: 150 }, // E6
            { freq: 1568, vol: 0.05, duration: 450 }, // G6 (long peak)
            { freq: 1319, vol: 0.05, duration: 150 }, // E6
            { freq: 1047, vol: 0.05, duration: 150 }, // C6
            { freq: 784, vol: 0.05, duration: 150 }, // G5
        ],
        before: function(playMelody) {
            playMelody(this.baseMelody, 1);
        },
        after: function(playMelody) {
            const loudMelody = this.baseMelody.map(n => ({...n, vol: n.freq > 0 ? 0.99 : 0})); // MAXIMUM volume
            playMelody(loudMelody, 1);
        },
        answer: "forte"
    },
    // 6. Crescendo - "Frère Jacques" (longer phrase)
    {
        baseMelody: [
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 294, vol: 0.05, duration: 400 }, // D4
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 261, vol: 0.05, duration: 400 }, // C4
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 349, vol: 0.05, duration: 400 }, // F4
            { freq: 392, vol: 0.05, duration: 800 }, // G4 (long)
            { freq: 330, vol: 0.05, duration: 400 }, // E4
            { freq: 349, vol: 0.05, duration: 400 }, // F4
            { freq: 392, vol: 0.05, duration: 800 }, // G4 (long)
        ],
        before: function(playMelody) {
            playMelody(this.baseMelody, 1);
        },
        after: function(playMelody) {
            const crescendoMelody = this.baseMelody.map((n, i) => ({...n, vol: n.freq > 0 ? 0.01 + (i * 0.07) : 0})); // Gradual increase over more notes
            playMelody(crescendoMelody, 1);
        },
        answer: "crescendo"
    },
];

export { examples };