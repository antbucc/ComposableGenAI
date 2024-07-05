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
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  padding: 5px;

  img {
    width: 24px;
    height: 24px;
  }
`;



export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
