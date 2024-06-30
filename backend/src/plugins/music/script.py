# /src/plugins/music/script.py

import os
import re
import argparse
from midiutil import MIDIFile # type: ignore
import shutil

def suggest_tempo(sections, base_tempo=100):
    densities = [analyze_note_density(section) for section in sections]
    max_density = max(densities) if densities else 1

    if max_density == 0:
        max_density = 1

    suggested_tempos = [base_tempo + int((density / max_density) * (base_tempo / 4)) for density in densities]

    return suggested_tempos

def analyze_note_density(tab_content):
    notes = re.findall(r'\d+', tab_content)
    return len(notes) / len(tab_content.split('\n'))

class Tabs:
    def __init__(self, content):
        self.symbols = ['h', '/', 'p', '\\', '*', '^', '|']
        self.a = []
        self.notes = [64, 59, 55, 50, 45, 40]
        self.content = content.split("\n")

    def preprocess(self):
        content = [x.strip() for x in self.content]

        for symbol in self.symbols:
            for i, line in enumerate(content):
                content[i] = line.replace(symbol, "-")

        for i in range(len(content)):
            content[i] = " ".join(content[i])  # Ensure spaces between characters

        for i, line in enumerate(content):
            self.a.append(line.split(" "))

        max_length = max(len(line) for line in self.a)
        for i in range(len(self.a)):
            self.a[i] += ['-'] * (max_length - len(self.a[i]))

        for i in range(len(self.a)):
            for j in range(len(self.a[i])):
                if self.a[i][j] == '1' and j + 1 < len(self.a[i]) and self.a[i][j + 1].isdigit():
                    self.a[i][j] = str((int(self.a[i][j]) * 10) + int(self.a[i][j + 1]))
                    self.a[i][j + 1] = '-'

    def convertNotes(self):
        for i in range(len(self.a)):
            if i < len(self.notes):  # Ensure we don't go out of range
                for j in range(len(self.a[i])):
                    if self.a[i][j].isdigit():
                        self.a[i][j] = str(int(self.a[i][j]) + self.notes[i])
                    else:
                        self.a[i][j] = '-'
            else:
                print(f"Warning: Skipping line {i} in the tab as it exceeds the number of strings.")

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

def extract_tempo(line):
    match = re.match(r"Tempo[:\s]*([\d]+)\s*(BPM)?", line, re.IGNORECASE)
    if match:
        return f"Tempo: {match.group(1)} BPM"
    return None

def extract_repetitions(line):
    match = re.match(r"Repetitions[:\s]*([\d]+)", line, re.IGNORECASE)
    if match:
        return f"Repetitions: {match.group(1)}"
    return "Repetitions: 1"

def polish_input(content, base_tempo=100):
    tempo_pattern = re.compile(r"Tempo[:\s]*([\d]+)\s*BPM", re.IGNORECASE)
    repetitions_pattern = re.compile(r"Repetitions[:\s]*([\d]+)", re.IGNORECASE)

    sections = []
    current_section = []
    current_tempo = None
    current_repetitions = "Repetitions: 1"

    for line in content.split('\n'):
        line = line.strip()

        extracted_tempo = extract_tempo(line)
        if extracted_tempo:
            current_tempo = extracted_tempo
            continue

        extracted_repetitions = extract_repetitions(line)
        if extracted_repetitions != "Repetitions: 1":
            current_repetitions = extracted_repetitions
            continue

        if re.match(r'^[eBGDAE]\|', line):
            current_section.append(line)
        else:
            if current_section:
                sections.append((current_tempo, current_repetitions, "\n".join(current_section)))
                current_section = []
                current_tempo = None
                current_repetitions = "Repetitions: 1"

    if current_section:
        sections.append((current_tempo, current_repetitions, "\n".join(current_section)))

    suggested_tempos = suggest_tempo([section[2] for section in sections], base_tempo)

    polished_sections = []

    for idx, (tempo, repetitions, tab_lines) in enumerate(sections):
        if not tempo:
            tempo = f"Tempo: {suggested_tempos[idx]} BPM"
        polished_sections.append((tempo, repetitions, tab_lines))

    return polished_sections

def clean_output_directory(directory):
    if os.path.exists(directory):
        shutil.rmtree(directory)
    os.makedirs(directory)

def main(tab_file, tempo, repetitions, output_dir, instrument):
    clean_output_directory(output_dir)

    with open(tab_file, "r") as f:
        tab_content = f.read()

    polished_sections = polish_input(tab_content, tempo)

    for idx, (section_tempo, section_repetitions, tab_lines) in enumerate(polished_sections):
        t = Tabs(tab_lines)
        t.preprocess()
        t.convertNotes()

        midi_filename = os.path.join(output_dir, f"output_{idx+1}.mid")
        wav_filename = os.path.join(output_dir, f"output_{idx+1}.wav")

        outputTrack = Track(tempo, instrument)
        outputTrack.midiGenerator(t.a, midi_filename, repetitions)

        if convert_midi_to_wav(midi_filename, wav_filename):
            print(f"Generated {wav_filename}")
        else:
            print(f"Failed to generate {wav_filename}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Convert guitar tab file to multiple MIDI and WAV files.")
    parser.add_argument("tab_file", help="The guitar tab file")
    parser.add_argument("tempo", type=int, help="Base tempo for the tabs")
    parser.add_argument("repetitions", type=int, help="Number of repetitions for the tabs")
    parser.add_argument("output_dir", help="The output directory for the generated files")
    parser.add_argument("instrument", type=int, help="MIDI instrument number")
    args = parser.parse_args()

    main(args.tab_file, args.tempo, args.repetitions, args.output_dir, args.instrument)
