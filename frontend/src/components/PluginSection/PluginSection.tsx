import React from 'react';
import MusicPluginSection from '../MusicPluginSection/MusicPluginSection';
import { PluginContainer } from './PluginSection.styles';

interface PluginSectionProps {
  plugin: string;
  card: any;
}

const PluginSection: React.FC<PluginSectionProps> = ({ plugin, card }) => {
  if (plugin === 'music') {
    return <MusicPluginSection card={card} />;
  }

  return (
    <PluginContainer>
      <p>{plugin} plugin is not yet implemented.</p>
    </PluginContainer>
  );
};

export default PluginSection;
