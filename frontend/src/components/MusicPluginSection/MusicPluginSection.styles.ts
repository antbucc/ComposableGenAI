import styled from 'styled-components';

export const MusicPluginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const ParametersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const InstrumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.input`
  padding: 5px;
  width: 60px;
`;

export const Select = styled.select`
  padding: 5px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: #e08e0b;
  }
`;

export const ExecuteButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  img {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background-color: darkorange;
  }
`;

export const OutputContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PlayPauseButton = styled.button`
  cursor: pointer; 
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px;

  img {
    width: 20px;
    height: 18px;
    filter: brightness(0);
  }

  &:hover {
    background-color: darkorange;
  }
`;

export const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  padding: 5px;

  img {
    width: 20px;
    height: 20px;
    filter: brightness(0);
  }

  &:hover {
    background-color: darkorange;
  }
`;
