// src/components/Flow/Flow.styles.ts

import styled from 'styled-components';

export const FlowContainer = styled.div`
  position: relative;
  z-index: 1; /* Lower z-index to ensure it's behind the modal */
  flex: 1; /* Use flex to take up the remaining space */
  width: 100%;
  overflow: hidden;
`;
