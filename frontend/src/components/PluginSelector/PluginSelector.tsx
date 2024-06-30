// src/components/PluginSelector/PluginSelector.tsx

import React, { useState, useEffect } from 'react';
import { fetchPlugins, addPluginToCard } from '../../services/api';
import { PluginSelectorContainer, Select, Button, PluginList, PluginItem } from './PluginSelector.styles';

interface PluginSelectorProps {
  cardId: string;
  onPluginAdded: () => void;
}

const PluginSelector: React.FC<PluginSelectorProps> = ({ cardId, onPluginAdded }) => {
  const [availablePlugins, setAvailablePlugins] = useState<string[]>([]);
  const [selectedPlugin, setSelectedPlugin] = useState<string>('');

  useEffect(() => {
    const getPlugins = async () => {
      const plugins = await fetchPlugins();
      setAvailablePlugins(plugins);
    };
    getPlugins();
  }, []);

  const handleAddPlugin = async () => {
    if (selectedPlugin) {
      await addPluginToCard(cardId, selectedPlugin);
      onPluginAdded();
    }
  };

  return (
    <PluginSelectorContainer>
      <Select value={selectedPlugin} onChange={(e) => setSelectedPlugin(e.target.value)}>
        <option value="" disabled>Select a plugin</option>
        {availablePlugins.map((plugin) => (
          <option key={plugin} value={plugin}>{plugin}</option>
        ))}
      </Select>
      <Button onClick={handleAddPlugin}>Add Plugin</Button>
      <PluginList>
        {availablePlugins.map((plugin) => (
          <PluginItem key={plugin} onClick={() => setSelectedPlugin(plugin)}>
            {plugin}
          </PluginItem>
        ))}
      </PluginList>
    </PluginSelectorContainer>
  );
};

export default PluginSelector;
