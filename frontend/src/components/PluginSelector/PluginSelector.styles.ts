// src/components/PluginSelector/PluginSelector.styles.ts

import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
`;

export const ModalContent = styled.div`
  padding: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid #ddd;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: orange;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: white;

  &:hover {
    background-color: #e08e0b;
  }
`;
