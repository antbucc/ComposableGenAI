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
  width: 10%;
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

interface ContentContainerProps {
    baseFontSize: number;
}

export const ContentContainer = styled.div<ContentContainerProps>`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Times New Roman', serif;
  font-size: ${(props) => props.baseFontSize}px;

  h1 { font-size: ${(props) => 2 * props.baseFontSize}px; }
  h2 { font-size: ${(props) => 1.75 * props.baseFontSize}px; }
  h3 { font-size: ${(props) => 1.5 * props.baseFontSize}px; }
  h4 { font-size: ${(props) => 1.25 * props.baseFontSize}px; }
  h5 { font-size: ${(props) => 1.1 * props.baseFontSize}px; }
  h6 { font-size: ${(props) => 1 * props.baseFontSize}px; }
  p, ul, ol, blockquote { font-size: ${(props) => 1 * props.baseFontSize}px; }
  pre { font-size: ${(props) => 0.8 * props.baseFontSize}px; }
`;
