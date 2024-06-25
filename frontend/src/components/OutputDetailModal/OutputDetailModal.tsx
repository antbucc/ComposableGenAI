// src/components/OutputDetailModal/OutputDetailModal.tsx

import React, { useState } from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  CopyButton
} from './OutputDetailModal.styles';
import copyIcon from '../../assets/copy.svg';
import doneIcon from '../../assets/done.svg';

interface OutputDetailModalProps {
  output: string;
  onRequestClose: () => void;
}

const OutputDetailModal: React.FC<OutputDetailModalProps> = ({ output, onRequestClose }) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Output Details</ModalTitle>
          <CloseButton onClick={onRequestClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          <pre>{output}</pre>
          <CopyButton onClick={handleCopyClick}>
            <img src={isCopying ? doneIcon : copyIcon} alt="Copy" />
          </CopyButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default OutputDetailModal;
