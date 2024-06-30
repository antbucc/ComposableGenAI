// src/components/PluginSection/PluginSection.styles.ts

import styled from 'styled-components';

export const SectionTitle = styled.div`
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  padding: 5px;

  &:hover {
    color: #007bff;
  }
`;

interface SectionContentProps {
    isCollapsed: boolean;
}

export const SectionContent = styled.div<SectionContentProps>`
  margin-top: 5px;
  max-height: ${(props) => (props.isCollapsed ? '0' : 'auto')};
  overflow-y: hidden;
  transition: max-height 0.3s ease-in-out;
`;
