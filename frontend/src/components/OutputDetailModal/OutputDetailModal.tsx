// src/components/OutputDetailModal/OutputDetailModal.tsx

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import DetailModal from '../DetailModal/DetailModal';
import {
  ModalContent,
  CopyButton,
  ToggleContainer,
  ToggleButton,
  InfoLabel
} from './OutputDetailModal.styles';
import { copyIcon, doneIcon } from '../../assets';

interface OutputDetailModalProps {
  output: string;
  onRequestClose: () => void;
}

const OutputDetailModal: React.FC<OutputDetailModalProps> = ({ output, onRequestClose }) => {
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
    <DetailModal title="Output Details" onRequestClose={onRequestClose}>
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
    </DetailModal>
  );
};

export default OutputDetailModal;
