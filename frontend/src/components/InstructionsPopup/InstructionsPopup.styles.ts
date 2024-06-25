// src/components/InstructionsPopup/InstructionsPopup.styles.ts

import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 300px; /* Adjust width as needed */
`;

export const PopupContent = styled.div`
  font-size: 16px;
  color: #333;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: black;

  &:hover {
    color: #e08e0b;
  }
`;

export const OkButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust as needed */
`;

export const OkButton = styled.button`
  padding: 10px 20px;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: black;

  &:hover {
    background-color: #e08e0b;
  }
`;
