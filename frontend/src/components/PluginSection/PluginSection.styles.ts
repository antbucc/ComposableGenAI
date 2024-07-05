// src/components/PluginSection/PluginSection.styles.ts

import styled from 'styled-components';

export const SectionContent = styled.div`
  width: 100%;
`;

export const PluginItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  text-transform: capitalize;
  padding: 5px;
  padding-left: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: orange;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const Button = styled.button`
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
