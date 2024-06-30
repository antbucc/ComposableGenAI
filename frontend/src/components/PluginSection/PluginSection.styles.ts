import styled from 'styled-components';

export const SectionContent = styled.div`
  width: 100%;
`;

export const PluginItem = styled.div`
  font-weight: bold;
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  text-transform: capitalize;
  
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: orange;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

interface PluginContentProps {
  isCollapsed: boolean;
}

export const PluginContent = styled.div<PluginContentProps>`
  margin-top: 5px;
  max-height: ${(props) => (props.isCollapsed ? '0' : 'auto')};
  overflow-y: hidden;
  transition: max-height 0.3s ease-in-out;
  width: 100%;
`;
