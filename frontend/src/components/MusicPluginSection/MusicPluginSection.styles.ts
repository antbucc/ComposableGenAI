import styled from 'styled-components';

export const MusicPluginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 5px;
  width: 100%;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: orange;
    outline: none;
    box-shadow: 0 0 5px orange;
  }
`;

export const Select = styled.select`
  padding: 5px;
  width: 100%;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    border-color: orange;
  }

  &:focus {
    border-color: orange;
    outline: none;
    box-shadow: 0 0 5px orange;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  margin: 0 auto;
  display: block;

  &:hover {
    background-color: #e08e0b;
  }
`;

export const OutputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  audio {
    width: 100%;
    margin-top: 10px;
  }
`;

export const DownloadLink = styled.a`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: orange;
  font-weight: bold;

  &:hover {
    color: #e08e0b;
  }
`;
