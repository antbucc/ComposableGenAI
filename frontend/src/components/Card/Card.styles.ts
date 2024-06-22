// src/components/Card/Card.styles.ts

import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
`;

export const CardTitle = styled.h2`
  margin-top: 0;
`;

export const StatusDot = styled.span<{ status: string }>`
  height: 10px;
  width: 10px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'executed':
        return 'green';
      case 'not-executed':
        return 'red';
      case 'evaluated':
        return 'green';
      case 'not-evaluated':
        return 'red';
      default:
        return 'grey';
    }
  }};
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
`;

export const InconsistentMessage = styled.p`
  color: red;
  font-weight: bold;
`;
