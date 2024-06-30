import React, { useState, useEffect } from 'react';
import { fetchPlugins, addPluginToCard } from '../../services/api';
import { PluginSelectorContainer, Select, Button } from './PluginSelector.styles';

interface PluginSelectorProps {
  cardId: string;
  onPluginAdded: () => void;
}

const PluginSelector: React.FC<PluginSelectorProps> = ({ cardId, onPluginAdded }) => {
  const [availablePlugins, setAvailablePlugins] = useState<string[]>([]);
  const [selectedPlugin, setSelectedPlugin] = useState<string>('');

  useEffect(() => {
    const getPlugins = async () => {
      try {
        const plugins = await fetchPlugins();
        setAvailablePlugins(Array.isArray(plugins) ? plugins : []);
      } catch (error) {
        console.error('Error fetching plugins:', error);
        setAvailablePlugins([]); // Ensure it's always an array
      }
    };
    getPlugins();
  }, []);

  const handleAddPlugin = async () => {
    if (selectedPlugin) {
      try {
        await addPluginToCard(cardId, selectedPlugin);
        onPluginAdded();
      } catch (error) {
        console.error('Error adding plugin to card:', error);
      }
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
    </PluginSelectorContainer>
  );
};

export default PluginSelector;
