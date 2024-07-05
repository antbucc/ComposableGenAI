import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
} from './DetailModal.styles';
import OutputDetailContainer from '../OutputDetailContainer/OutputDetailContainer';
import GuitarTabsConverterContainer from '../GuitarTabsConverterPluginContainer/GuitarTabsConverterPluginContainer'; // Import plugin containers

interface DetailModalProps {
  title: string;
  onRequestClose: () => void;
  content: string;
  card: any;
}

const DetailModal: React.FC<DetailModalProps> = ({ title, onRequestClose, content, card }) => {
  const renderModalContent = () => {
    switch (content) {
      case 'guitar-tabs-converter':
        return <GuitarTabsConverterContainer card={card} />;
      case 'output-detail':
        return <OutputDetailContainer output={card.output.generatedText} />;
      default:
        return <p>{content} plugin is not yet implemented.</p>;
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onRequestClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          {renderModalContent()}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DetailModal;
