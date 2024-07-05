// src/components/PluginSection/PluginSection.tsx

import React from 'react';
import { SectionContent, PluginItem, Button } from './PluginSection.styles';
import { openNewIcon } from '../../assets';

interface PluginSectionProps {
  plugins: string[];
  card: any;
  onOpenModal: (plugin: string, card: any) => void; // Updated to pass card data
}

const PluginSection: React.FC<PluginSectionProps> = ({ plugins, card, onOpenModal }) => {
  return (
    <SectionContent>
      {plugins.map((plugin) => (
        <PluginItem key={plugin}>
          <div>{plugin}</div>
          <Button onClick={() => onOpenModal(plugin, card)}>
            <img src={openNewIcon} alt="Open" />
          </Button>
        </PluginItem>
      ))}
    </SectionContent>
  );
};

export default PluginSection;
