import React from 'react';
import { SectionContent, PluginItem, Button } from './PluginSection.styles';
import { openNewIcon } from '../../assets';

interface PluginSectionProps {
  plugins: string[];
  card: any;
  onOpenModal: (type: string, data?: any) => void;
}

const PluginSection: React.FC<PluginSectionProps> = ({ plugins, card, onOpenModal }) => {
  const handleOpenModal = (plugin: string) => {
    onOpenModal(plugin, card); // Pass card data to the modal
  };

  return (
    <SectionContent>
      {plugins.map((plugin) => (
        <PluginItem key={plugin}>
          <div>{plugin}</div>
          <Button onClick={() => handleOpenModal(plugin)}>
            <img src={openNewIcon} alt="Open" />
          </Button>
        </PluginItem>
      ))}
    </SectionContent>
  );
};

export default PluginSection;
