import React, { useState } from 'react';
import { executePlugin } from '../../services/api';
import {
  MusicPluginContainer,
  ParametersContainer,
  InstrumentContainer,
  Input,
  Select,
  Button,
  OutputContainer,
  FileContainer,
  PlayPauseButton,
  DownloadButton,
  ButtonContainer,
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
  const [files, setFiles] = useState<Array<{ midi: string, wav: string }>>([]);
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
      const midiFile = response.find((file: any) => file.filename.endsWith('.mid')).content;
      const wavFile = response.find((file: any) => file.filename.endsWith('.wav')).content;
      setFiles([...files, { midi: midiFile, wav: wavFile }]);
    } catch (error) {
      console.error('Error executing music plugin:', error);
    }
  };

  const handlePlayPause = (index: number) => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = `data:audio/wav;base64,${files[index].wav}`;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicPluginContainer>
      <ParametersContainer>
        <div>
          <label>Tempo:</label>
          <Input type="text" value={tempo} onChange={(e) => setTempo(Number(e.target.value))} />
        </div>
        <div>
          <label>Repetitions:</label>
          <Input type="text" value={repetitions} onChange={(e) => setRepetitions(Number(e.target.value))} />
        </div>
      </ParametersContainer>
      <InstrumentContainer>
        <label>Instrument:</label>
        <Select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
          {instruments.map((inst) => (
            <option key={inst} value={inst}>{inst}</option>
          ))}
        </Select>
      </InstrumentContainer>
      <Button onClick={handleExecute}>Execute Music Plugin</Button>
      {files.length > 0 && (
        <OutputContainer>
          {files.map((file, index) => (
            <FileContainer key={index}>
              <div>
                <label>Audio:</label>
                <ButtonContainer>
                  <PlayPauseButton onClick={() => handlePlayPause(index)}>
                    <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
                  </PlayPauseButton>
                  <DownloadButton href={`data:audio/wav;base64,${file.wav}`} download={`output${index + 1}.wav`}>
                    <img src={downloadIcon} alt="Download" />
                  </DownloadButton>
                </ButtonContainer>
              </div>
              {file.midi && (
                <div>
                  <label>MIDI:</label>
                  <ButtonContainer>
                    <DownloadButton href={`data:audio/midi;base64,${file.midi}`} download={`output${index + 1}.mid`}>
                      <img src={downloadIcon} alt="Download" />
                    </DownloadButton>
                  </ButtonContainer>
                </div>
              )}
            </FileContainer>
          ))}
          <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        </OutputContainer>
      )}
    </MusicPluginContainer>
  );
};

export default MusicPluginSection;
