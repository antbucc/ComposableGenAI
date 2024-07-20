import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 20px;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #000;

  &:hover {
    background-color: #e08e0b;
  }
`;

export const SelectContainer = styled.div`
  margin-bottom: 10px;
`;

export const SelectLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;
`;

export const Select = styled.select`
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
