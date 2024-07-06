import styled from 'styled-components';

export const FormContainer = styled.div`
  position: absolute;
  width: 30%;
  padding: 60px 20px 20px 20px;
  background: #fff;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 1001;
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FormLabel = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const FormButton = styled.button`
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

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
  font-size: 16px;

  input[type="checkbox"] {
    appearance: none;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border: 2px solid #333;
    border-radius: 4px;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s, border-color 0.2s;

    &:checked {
      background-color: orange;
      border-color: #000;
    }
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  height: auto;
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
  cursor: grab;
`;

export const LoadingModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

export const LoadingText = styled.p`
  font-size: 18px;
  color: #000;
  font-weight: bold;
`;
