// src/components/OutputDetailModal/OutputDetailModal.styles.ts

import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

export const ModalContent = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px; /* For scrollbar space */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }

  pre {
    white-space: pre-wrap; /* Preserve whitespace and wrap lines */
    word-wrap: break-word; /* Break long words */
  }
`;

export const CopyButton = styled.button`
  background: orange;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 10px;

  img {
    width: 15px;
    height: 15px;
    margin-right: 3px;
    filter: brightness(0); 
  }

  &:hover {
    background: #ff8c00;
  }
`;
