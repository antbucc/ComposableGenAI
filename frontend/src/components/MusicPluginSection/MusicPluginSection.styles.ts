// src/components/MusicPluginSection/MusicPluginSection.styles.ts

import styled from 'styled-components';

export const MusicPluginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 5px;
  width: 100%;
`;

export const Select = styled.select`
  padding: 5px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #e08e0b;
  }
`;

export const OutputContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  color: white;

  img {
    width: 16px;
    height: 16px;
    margin-left: 5px;
  }

  &:hover {
    background-color: #e08e0b;
  }
`;
