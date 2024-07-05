// src/components/OutputDetailContainer/OutputDetailContainer.tsx

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ModalContent, 
  CopyButton, 
  ToggleContainer, 
  ToggleButton, 
  InfoLabel 
} from './OutputDetailContainer.styles';
import { copyIcon, doneIcon } from '../../assets';

interface OutputDetailContainerProps {
  output: string;
}

const OutputDetailContainer: React.FC<OutputDetailContainerProps> = ({ output }) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isMarkdown, setIsMarkdown] = useState(true);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const toggleDisplayMode = () => {
    setIsMarkdown(!isMarkdown);
  };

  return (
    <ModalContent>
      <ToggleContainer>
        <InfoLabel>If the output is not displayed correctly, click here to show it raw:</InfoLabel>
        <ToggleButton onClick={toggleDisplayMode}>
          {isMarkdown ? 'Show Raw' : 'Show Markdown'}
        </ToggleButton>
      </ToggleContainer>
      {isMarkdown ? <ReactMarkdown>{output}</ReactMarkdown> : <pre>{output}</pre>}
      <CopyButton onClick={handleCopyClick}>
        <img src={isCopying ? doneIcon : copyIcon} alt="Copy" />
      </CopyButton>
    </ModalContent>
  );
};

export default OutputDetailContainer;
