// src/components/PluginSection/PluginSection.tsx

import React, { useState } from 'react';
import MusicPluginSection from '../MusicPluginSection/MusicPluginSection';
import {  SectionTitle, SectionContent } from './PluginSection.styles';

interface PluginSectionProps {
  plugin: string;
  card: any;
}

const PluginSection: React.FC<PluginSectionProps> = ({ plugin, card }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const renderPluginContent = () => {
    if (plugin === 'music') {
      return <MusicPluginSection card={card} />;
    }
    return <p>{plugin} plugin is not yet implemented.</p>;
  };

  return (
    <>
      <SectionTitle onClick={() => setIsCollapsed(!isCollapsed)}>
        {plugin} {isCollapsed ? '▼' : '▲'}
      </SectionTitle>
      <SectionContent isCollapsed={isCollapsed}>
        {renderPluginContent()}
      </SectionContent>
    </>
  );
};

export default PluginSection;
