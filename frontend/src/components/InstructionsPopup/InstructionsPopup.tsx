// src/components/InstructionsPopup/InstructionsPopup.tsx

import React from 'react';
import { PopupContainer, PopupContent, CloseButton, OkButtonContainer, OkButton } from './InstructionsPopup.styles';

interface InstructionsPopupProps {
    onClose: () => void;
}

const InstructionsPopup: React.FC<InstructionsPopupProps> = ({ onClose }) => {
    return (
        <PopupContainer>
            <PopupContent>
                <h2>No Cards Available</h2>
                <p>To get started, click the &quot;+&quot; button to create a new card.</p>
            </PopupContent>
            <OkButtonContainer>
                <OkButton onClick={onClose}>OK</OkButton>
            </OkButtonContainer>
            <CloseButton onClick={onClose}>x</CloseButton>
        </PopupContainer>
    );
};

export default InstructionsPopup;
