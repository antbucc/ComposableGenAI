// src/components/DetailModal/DetailModal.tsx

import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
} from './DetailModal.styles';

interface DetailModalProps {
  title: string;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const DetailModal: React.FC<DetailModalProps> = ({ title, onRequestClose, children }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onRequestClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DetailModal;
