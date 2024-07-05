# src/plugins/guitar-tabs-converter/track.py
import os
from midiutil import MIDIFile # type: ignore

class Track:
    def __init__(self, tempo, instrument):
        self.track = 0
        self.channel = 0
        self.time = 0.125    # In beats, this controls the timing of notes
        self.duration = 0.25  # In beats, this controls the duration of notes
        self.tempo = tempo   # In BPM
        self.volume = 100    # 0-127, as per the MIDI standard
        self.instrument = instrument

    def midiGenerator(self, a, midi_filename, repetitions=1):
        MyMIDI = MIDIFile(1)

        # Add instrument change to the MIDI file
        MyMIDI.addProgramChange(self.track, self.channel, self.time, self.instrument)
        MyMIDI.addTempo(self.track, self.time, self.tempo)
        time = 0
        for _ in range(repetitions):
            for i in range(len(a[0])):
                for j in range(len(a)):
                    duration = self.duration
                    if i < len(a[j]) and a[j][i] != '-' and a[j][i].isdigit():
                        if i + 1 < len(a[j]) and a[j][i + 1] == '-':
                            duration = self.duration + 1
                        MyMIDI.addNote(self.track, self.channel, int(a[j][i]), time, duration, self.volume)
                time += self.time

        with open(midi_filename, "wb") as output_file:
            MyMIDI.writeFile(output_file)

def convert_midi_to_wav(midi_file, wav_file):
    command = f"timidity {midi_file} -Ow -o {wav_file}"
    os.system(command)
    return os.path.exists(wav_file)
