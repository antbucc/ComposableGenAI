// src/components/MusicPluginSection/MusicPluginSection.tsx

import React, { useState } from 'react';
import { executePlugin } from '../../services/api';
import {
  MusicPluginContainer,
  Input,
  Select,
  Button,
  OutputContainer,
  PlayPauseButton,
  DownloadButton,
} from './MusicPluginSection.styles';
import { playIcon, pauseIcon, downloadIcon } from '../../assets';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handleExecute = async () => {
    const params = {
      input: card.output.generatedText,
      tempo,
      repetitions,
      instrument,
    };

    try {
      const response = await executePlugin('music', params);
      setMidiFile(response.find((file: any) => file.filename.endsWith('.mid')).content);
      setWavFile(response.find((file: any) => file.filename.endsWith('.wav')).content);
    } catch (error) {
      console.error('Error executing music plugin:', error);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicPluginContainer>
      <div>
        <label>Tempo:</label>
        <Input type="text" value={tempo} onChange={(e) => setTempo(Number(e.target.value))} />
      </div>
      <div>
        <label>Repetitions:</label>
        <Input type="text" value={repetitions} onChange={(e) => setRepetitions(Number(e.target.value))} />
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
      {wavFile && (
        <OutputContainer>
          <PlayPauseButton onClick={handlePlayPause}>
            <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
          </PlayPauseButton>
          <audio ref={audioRef} src={`data:audio/wav;base64,${wavFile}`} onEnded={() => setIsPlaying(false)} />
          {midiFile && (
            <div>
              <label>MIDI File:</label>
              <DownloadButton href={`data:audio/midi;base64,${midiFile}`} download="output.mid">
                <img src={downloadIcon} alt="Download" />
              </DownloadButton>
            </div>
          )}
        </OutputContainer>
      )}
    </MusicPluginContainer>
  );
};

export default MusicPluginSection;
