# src/plugins/music/utils.py

import re

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
