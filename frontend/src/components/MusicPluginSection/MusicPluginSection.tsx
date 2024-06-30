import React, { useState } from 'react';
import { executePlugin } from '../../services/api';
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
  const [files, setFiles] = useState<{ filename?: string; content?: string }[]>([]);

  const handleExecute = async () => {
    const params = {
      input: card.output.generatedText,
      tempo,
      repetitions,
      instrument
    };

    try {
      const response = await executePlugin('music', params);
      setFiles(response);
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
      {files.length > 0 && (
        <OutputContainer>
          {files.map((file, index) => (
            <div key={index}>
              {file.filename && file.content && (
                <>
                  <DownloadLink href={`data:audio/${file.filename.split('.').pop()};base64,${file.content}`} download={file.filename}>
                    Download {file.filename.split('.').pop()?.toUpperCase()}
                  </DownloadLink>
                  {file.filename.endsWith('.wav') && (
                    <audio controls>
                      <source src={`data:audio/wav;base64,${file.content}`} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </>
              )}
            </div>
          ))}
        </OutputContainer>
      )}
    </MusicPluginContainer>
  );
};

export default MusicPluginSection;
