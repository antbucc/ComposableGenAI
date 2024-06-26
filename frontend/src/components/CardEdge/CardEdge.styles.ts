// src/components/CardEdge/CardEdge.styles.ts

import styled from 'styled-components';

export const EdgeButton = styled.img`
  cursor: pointer;
  border: 2px solid black;
  border-radius: 50%;
  background-color: red;
`;

export const EdgePath = styled.path`
  stroke: #000000;
  stroke-width: 2;
`;

export const PopoverContainer = styled.div`
  position: absolute;
  background: white;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
`;
