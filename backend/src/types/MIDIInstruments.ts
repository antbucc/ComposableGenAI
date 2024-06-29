// src/types/MIDIInstruments.ts

export enum MIDIInstruments {
    // Piano
    AcousticGrandPiano = 0,
    ElectricGrandPiano = 2,
    ElectricPiano1 = 4,

    // Guitar
    AcousticGuitarNylon = 24,
    ElectricGuitarClean = 27,
    OverdrivenGuitar = 29,

    // Bass
    AcousticBass = 32,
    ElectricBassFinger = 33,

    // Strings
    Violin = 40,
    Cello = 42,
    OrchestralHarp = 46,

    // Ensemble
    StringEnsemble1 = 48,
    SynthStrings1 = 50,
    ChoirAahs = 52,

    // Brass
    Trumpet = 56,
    Trombone = 57,
    FrenchHorn = 60,

    // Reed
    AltoSax = 65,
    TenorSax = 66,

    // Pipe
    Flute = 73,
    PanFlute = 75,

    // Synth Lead
    Lead1Square = 80,
    Lead2Sawtooth = 81,

    // Percussive
    TinkleBell = 112,
    SteelDrums = 114,
}

export function getMIDIInstrumentNumber(instrumentName: string): number | undefined {
    return MIDIInstruments[instrumentName as keyof typeof MIDIInstruments];
}
