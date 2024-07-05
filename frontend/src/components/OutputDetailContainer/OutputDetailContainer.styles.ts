// src/components/OutputDetailContainer/OutputDetailContainer.styles.ts

import styled from 'styled-components';

export const ModalContent = styled.div`
  max-height: calc(80vh - 100px);
  overflow-y: auto;
  padding-right: 10px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
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
  position: absolute;
  top: 20px;
  right: 70px;

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

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleButton = styled.button`
  background: orange;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: #ff8c00;
  }
`;

export const InfoLabel = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;
