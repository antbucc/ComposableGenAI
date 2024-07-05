// src/components/PluginSection/PluginSection.tsx

import React, { useState } from 'react';
import {
  SectionContent,
  PluginItem,
  PluginContent,
} from './PluginSection.styles';
import GuitarTabsConverterPluginSection from '../GuitarTabsConverterPluginSection/GuitarTabsConverterPluginSection';
import ABCConverterPluginSection from '../ABCConverterPluginSection/ABCConverterPluginSection';

interface PluginSectionProps {
  plugins: string[];
  card: any;
}

const PluginSection: React.FC<PluginSectionProps> = ({ plugins, card }) => {
  const [selectedPlugin, setSelectedPlugin] = useState<string | null>(null);

  const handlePluginClick = (plugin: string) => {
    setSelectedPlugin(selectedPlugin === plugin ? null : plugin);
  };

  const renderPluginContent = () => {
    switch (selectedPlugin) {
      case 'guitar-tabs-converter':
        return <GuitarTabsConverterPluginSection card={card} />;
      case 'abc-converter':
        return <ABCConverterPluginSection card={card} />;
      // Add cases for other plugins here
      default:
        return <p>{selectedPlugin} plugin is not yet implemented.</p>;
    }
  };

  return (
    <SectionContent>
      {plugins.map((plugin) => (
        <PluginItem key={plugin}>
          <div onClick={() => handlePluginClick(plugin)}>
            {plugin}
          </div>
          <PluginContent isCollapsed={selectedPlugin !== plugin}>
            {selectedPlugin === plugin && renderPluginContent()}
          </PluginContent>
        </PluginItem>
      ))}
    </SectionContent>
  );
};

export default PluginSection;
