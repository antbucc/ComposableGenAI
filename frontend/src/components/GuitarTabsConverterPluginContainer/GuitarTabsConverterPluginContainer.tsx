// src/components/GuitarTabsConverterContainer/GuitarTabsConverterContainer.tsx

import React, { useState } from 'react';
import { executePlugin } from '../../services/api';
import {
  GuitarTabsConverterContainerWrapper,
  ParametersContainer,
  InstrumentContainer,
  Input,
  Select,
  OutputContainer,
  FileContainer,
  PlayPauseButton,
  DownloadButton,
  ButtonContainer,
  ExecuteButton,
} from './GuitarTabsConverterPluginContainer.styles';
import { playIcon, pauseIcon, downloadIcon, executeDownIcon } from '../../assets';
import { MUSIC_INSTRUMENTS } from '../../config/config';

interface GuitarTabsConverterContainerProps {
  card: any;
}

interface File {
  filename: string;
  content: string;
}

interface PluginFile {
  midi: string;
  wav: string;
}

const GuitarTabsConverterContainer: React.FC<GuitarTabsConverterContainerProps> = ({ card }) => {
  const [tempo, setTempo] = useState<number>(120);
  const [repetitions, setRepetitions] = useState<number>(1);
  const [instrument, setInstrument] = useState<string>(MUSIC_INSTRUMENTS[0]);
  const [files, setFiles] = useState<PluginFile[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean[]>([]);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handleExecute = async () => {
    const params = {
      input: card.output.generatedText,
      tempo,
      repetitions,
      instrument,
    };

    try {
      const response: File[] = await executePlugin('guitar-tabs-converter', params);
      const newFiles: Record<string, PluginFile> = response.reduce((acc: Record<string, PluginFile>, file) => {
        const fileType = file.filename.endsWith('.mid') ? 'midi' : 'wav';
        const fileName = file.filename.split('.')[0];

        if (!acc[fileName]) {
          acc[fileName] = { midi: '', wav: '' };
        }
        acc[fileName][fileType] = file.content;

        return acc;
      }, {});

      setFiles(Object.values(newFiles));
      setIsPlaying(new Array(Object.values(newFiles).length).fill(false));
    } catch (error) {
      console.error('Error executing guitar-tabs-converter plugin:', error);
    }
  };

  const handlePlayPause = (index: number) => {
    if (audioRef.current) {
      if (isPlaying[index]) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = `data:audio/wav;base64,${files[index].wav}`;
        audioRef.current.play();
      }
      setIsPlaying((prev) =>
        prev.map((playing, i) => (i === index ? !playing : playing))
      );
    }
  };

  return (
    <GuitarTabsConverterContainerWrapper>
      <h2>Card Output</h2>
      <p>{card.output.generatedText}</p>
      <h3>Parameters</h3>
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
          {MUSIC_INSTRUMENTS.map((inst) => (
            <option key={inst} value={inst}>{inst}</option>
          ))}
        </Select>
      </InstrumentContainer>
      <ExecuteButton onClick={handleExecute}>
        <img src={executeDownIcon} alt="Execute" />
      </ExecuteButton>
      {files.length > 0 && (
        <OutputContainer>
          {files.map((file, index) => (
            <FileContainer key={index}>
              <div>
                <label>Audio:</label>
                <ButtonContainer>
                  <PlayPauseButton onClick={() => handlePlayPause(index)}>
                    <img src={isPlaying[index] ? pauseIcon : playIcon} alt="Play/Pause" />
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
          <audio ref={audioRef} onEnded={() => setIsPlaying((prev) => prev.map(() => false))} />
        </OutputContainer>
      )}
    </GuitarTabsConverterContainerWrapper>
  );
};

export default GuitarTabsConverterContainer;
