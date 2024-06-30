import styled from 'styled-components';

export const PluginSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
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

export const PluginList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  background-color: #fff;
`;

export const PluginItem = styled.div`
  padding: 10px;
  border: 2px solid #333;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
