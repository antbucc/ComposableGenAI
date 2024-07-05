// src/ABCConverterPluginContainer.styles.ts

import styled from 'styled-components';

export const ABCConverterContainerWrapper = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const OutputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
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

export const PlayButton = styled.button`
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
