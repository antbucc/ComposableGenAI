// src/components/DraggablePopover/DraggablePopover.styles.ts
import styled from 'styled-components';

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

export const PopoverContainer = styled.div`
  position: absolute;
  width: 28%;
  height: 50vh;
  padding: 60px 20px 0 20px; /* Adjust padding to accommodate title */
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  overflow: hidden;
  border: 2px solid #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const PopoverContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px; /* For scrollbar space */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;

export const ButtonContainer = styled.div`
  border-top: 2px solid black;
  width: calc(100% + 40px); /* Adjust width to compensate for the padding of PopoverContainer */
  margin-left: -20px; /* Offset margin to align with PopoverContainer */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background: white;
  height: 50px; /* Adjust the height to not much bigger than the buttons */
  flex-shrink: 0; /* Ensure the button container does not shrink */
`;


export const Section = styled.div`
  margin-bottom: 10px;
`;

export const SectionTitle = styled.div`
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;

  &:hover {
    color: #007bff;
  }
`;

interface SectionContentProps {
  isCollapsed: boolean;
}

export const SectionContent = styled.div<SectionContentProps>`
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  display: ${(props) => (props.isCollapsed ? 'none' : 'block')};

  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 5px;
`;

export const Value = styled.span`
  margin-left: 5px;
`;




interface ExecuteButtonProps {
  disabled?: boolean;
}

export const ExecuteButton = styled.button<ExecuteButtonProps>`
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  background-color: green;
  position: relative;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin-bottom: 5px; /* Add margin to separate buttons */

  &:hover {
    background-color: darkgreen;
  }

  img {
    filter: brightness(0); /* Change the image color to black */
    width: 20px;
    height: 20px;
  }

  &::after {
    content: attr(data-tooltip); /* Use data-tooltip attribute for tooltip content */
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

interface EvaluateButtonProps {
  disabled?: boolean;
}

export const EvaluateButton = styled.button<EvaluateButtonProps>`
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  background-color: yellow;
  position: relative;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin-bottom: 5px; /* Add margin to separate buttons */

  &:hover {
    background-color: orange;
  }

  img {
    filter: brightness(0); /* Change the image color to black */
    width: 20px;
    height: 20px;
  }

  &::after {
    content: attr(data-tooltip); /* Use data-tooltip attribute for tooltip content */
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
  margin: 0 10px; /* Add margin to center the loading message */
  font-size: 14px;
  color: #000;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 60px;
  right: 10px;
  background: orange;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 15px;
    height: 15px;
    margin-right: 3px;
    filter: brightness(0); 
  }

  &:hover {
    background: #ff8c00; 
  }
`;

export const ResolveButton = styled.button`
  position: absolute;
  top: 60px;
  right: 60px;
  background: orange;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 15px;
    height: 15px;
    margin-right: 3px;
    filter: brightness(0); 
  }

  &:hover {
    background: #ff8c00;
  }
`;

export const TitleBand = styled.div`
  background-color: orange;
  width: 100%;
  height: 40px;
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
  line-height: 40px;
`;
