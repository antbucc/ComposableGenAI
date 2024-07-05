// src/ABCConverterPluginContainer.styles.ts

import styled from 'styled-components';

export const ABCConverterContainerWrapper = styled.div`
  position: relative;
  padding: 60px 20px 0 20px; /* Adjust padding to accommodate title */
  background: white;
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const OutputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;

export const CopyButton = styled.button`
  background: orange;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

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

export const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
