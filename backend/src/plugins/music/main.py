# src/plugins/music/main.py

import os
import argparse
import shutil
from utils import polish_input
from tabs import Tabs
from track import Track, convert_midi_to_wav

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
