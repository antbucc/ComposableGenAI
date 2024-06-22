import styled from 'styled-components';

export const CardContainer = styled.div`
  padding: 16px 0 16px 16px; /* Adjust padding to fit the title band */
  border-color: black;
  margin: 16px;
  border-radius: 10px;
  border: 2px solid black; /* Added black stroke */
  background-color: #fff;
  width: 200px;
  height: 120px;
  position: relative;
`;

export const TitleBand = styled.div`
  background-color: orange;
  width: 100%;
  padding: 8px 0;
  border-bottom: 2px solid black;
  border-color: black;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
  font-weight: bold;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 16px;
`;

export const StatusDot = styled.span<{ status: string }>`
  height: 20px;
  width: 20px;
  background-color: ${({ status }) => (status === 'executed' ? 'green' : 'red')};
  border-radius: 50%;
  border: 2px solid black; /* Added black stroke */
  display: inline-block;
  margin-left: 8px; /* Add margin to separate from button */
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px; /* Adjusted width for better spacing */
`;

export const ExecuteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: green;
  border: 2px solid black; /* Added black stroke */
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: darkgreen;
  }

  img {
    filter: brightness(0);
    width: 20px;
    height: 20px;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    display: none;
    white-space: nowrap;
  }

  &:hover::after {
    display: block;
  }
`;

export const LoadingMessage = styled.p`
  margin: 0 0 8px 0; /* Add margin to center the loading message */
  font-size: 14px;
  color: #000;
  text-align: center; /* Center align the text */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const WarningIcon = styled.img`
  position: absolute;
  border: 2px solid black;
  border-radius: 5px;
  top: 4px;
  left: 6px;
  width: 24px;
  height: 24px;
  filter: brightness(0); /* Change the image color to black */

`;
