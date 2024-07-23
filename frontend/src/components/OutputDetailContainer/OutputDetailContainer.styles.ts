import styled from "styled-components";

export const ModalContent = styled.div`
  max-height: calc(80vh - 100px);
  overflow-y: auto;
  padding-right: 10px;
  position: relative;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0px;
  right: 50px; /* Adjust right position to make room for the close button */
`;

export const CopyButton = styled.button`
  background: orange;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;

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

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleButton = styled.button`
  background: orange;
  padding: 5px 10px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: #ff8c00;
  }
`;

export const InfoLabel = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

export const EditButton = styled(CopyButton)``;

export const SaveButton = styled(CopyButton)``;

export const TextArea = styled.textarea`
  flex: 1; /* Allow the textarea to grow and fill the remaining space */
  resize: none; /* Disable resizing */
  border: 2px solid #333;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
  box-sizing: border-box;
  height: calc(70vh - 100px);
`;
