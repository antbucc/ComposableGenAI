// src/components/PluginSection/PluginSection.tsx

import React, { useState } from 'react';
import { SectionContent, PluginItem, Button } from './PluginSection.styles';
import GuitarTabsConverterContainer from '../GuitarTabsConverterPluginContainer/GuitarTabsConverterPluginContainer';
import DetailModal from '../DetailModal/DetailModal';
import { openNewIcon } from '../../assets';

interface PluginSectionProps {
  plugins: string[];
  card: any;
}

const PluginSection: React.FC<PluginSectionProps> = ({ plugins, card }) => {
  const [selectedPlugin, setSelectedPlugin] = useState<string | null>(null);

  const handleOpenModal = (plugin: string) => {
    setSelectedPlugin(plugin);
  };

  const handleCloseModal = () => {
    setSelectedPlugin(null);
  };

  const renderPluginContent = () => {
    switch (selectedPlugin) {
      case 'guitar-tabs-converter':
        return <GuitarTabsConverterContainer card={card} />;
      // Add cases for other plugins here
      default:
        return <p>{selectedPlugin} plugin is not yet implemented.</p>;
    }
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
      {selectedPlugin && (
        <DetailModal title={selectedPlugin} onRequestClose={handleCloseModal}>
          {renderPluginContent()}
        </DetailModal>
      )}
    </SectionContent>
  );
};

export default PluginSection;
