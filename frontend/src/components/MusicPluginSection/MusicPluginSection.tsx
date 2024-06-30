import React, { useState } from 'react';
import { executeMusicPlugin } from '../../services/api';
import { MusicPluginContainer, Input, Select, Button, OutputContainer, DownloadLink } from './MusicPluginSection.styles';

interface MusicPluginSectionProps {
  card: any;
}

const instruments = [
  "AcousticGrandPiano",
  "BrightAcousticPiano",
  "ElectricGrandPiano",
  "HonkytonkPiano",
  "ElectricPiano1",
  "ElectricPiano2",
  "Harpsichord",
  "Clavinet",
  // Add other instruments as needed
];

const MusicPluginSection: React.FC<MusicPluginSectionProps> = ({ card }) => {
  const [tempo, setTempo] = useState<number>(120);
  const [repetitions, setRepetitions] = useState<number>(1);
  const [instrument, setInstrument] = useState<string>(instruments[0]);
  const [midiFile, setMidiFile] = useState<string | null>(null);
  const [wavFile, setWavFile] = useState<string | null>(null);

  const handleExecute = async () => {
    const params = {
      input: card.output.generatedText,
      tempo,
      repetitions,
      instrument
    };

    try {
      const response = await executeMusicPlugin(card._id, params);
      setMidiFile(response.midi);
      setWavFile(response.wav);
    } catch (error) {
      console.error('Error executing music plugin:', error);
    }
  };

  return (
    <MusicPluginContainer>
      <div>
        <label>Tempo:</label>
        <Input type="number" value={tempo} onChange={(e) => setTempo(Number(e.target.value))} />
      </div>
      <div>
        <label>Repetitions:</label>
        <Input type="number" value={repetitions} onChange={(e) => setRepetitions(Number(e.target.value))} />
      </div>
      <div>
        <label>Instrument:</label>
        <Select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
          {instruments.map((inst) => (
            <option key={inst} value={inst}>{inst}</option>
          ))}
        </Select>
      </div>
      <Button onClick={handleExecute}>Execute Music Plugin</Button>
      {midiFile && (
        <OutputContainer>
          <DownloadLink href={`data:audio/midi;base64,${midiFile}`} download="output.mid">Download MIDI</DownloadLink>
          <DownloadLink href={`data:audio/wav;base64,${wavFile}`} download="output.wav">Download WAV</DownloadLink>
          <audio controls>
            <source src={`data:audio/wav;base64,${wavFile}`} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </OutputContainer>
      )}
    </MusicPluginContainer>
  );
};

export default MusicPluginSection;
