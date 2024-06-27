import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CardContainer = styled.div`
  padding: 16px 0 16px 16px;
  border-color: black;
  margin: 16px;
  border-radius: 10px;
  border: 2px solid black;
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
  border: 2px solid black;
  display: inline-block;
  margin-left: 8px;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
`;

export const ExecuteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: green;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

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

export const LoadingIcon = styled.img`
  animation: ${spin} 2s linear infinite;
`;

export const LoadingMessage = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #000;
  text-align: center;
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
  filter: brightness(0);
`;
