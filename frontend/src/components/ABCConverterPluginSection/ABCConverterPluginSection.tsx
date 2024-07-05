// src/components/ABCConverterPluginSection/ABCConverterPluginSection.tsx

import React from 'react';
import { ABCConverterPluginContainer, Placeholder } from './ABCConverterPluginSection.styles';

interface ABCConverterPluginSectionProps {
  card: any;
}

const ABCConverterPluginSection: React.FC<ABCConverterPluginSectionProps> = ({ card }) => {
  return (
    <ABCConverterPluginContainer>
      <Placeholder>ABC Converter Plugin Placeholder</Placeholder>
    </ABCConverterPluginContainer>
  );
};

export default ABCConverterPluginSection;
