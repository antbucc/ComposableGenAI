// src/components/PluginSelector/PluginSelector.tsx

import React, { useState, useEffect } from 'react';
import { fetchPlugins, addPluginToCard } from '../../services/api';
import { Modal, CloseButton, Select, Button, ModalContainer, ModalHeader, ModalContent, ModalFooter } from './PluginSelector.styles';
import { closeIcon } from '../../assets';

interface PluginSelectorProps {
  cardId: string;
  onPluginAdded: (plugin: string) => void; // Update the type to accept a plugin parameter
  onClose: () => void;
}

const PluginSelector: React.FC<PluginSelectorProps> = ({ cardId, onPluginAdded, onClose }) => {
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
      onPluginAdded(selectedPlugin); // Pass the selected plugin to the handler
      onClose(); // Close the modal after adding plugin
    }
  };

  return (
    <Modal>
      <ModalContainer>
        <ModalHeader>
          <h2>Select Plugin</h2>
          <CloseButton onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          <Select value={selectedPlugin} onChange={(e) => setSelectedPlugin(e.target.value)}>
            <option value="" disabled>Select a plugin</option>
            {availablePlugins.map((plugin) => (
              <option key={plugin} value={plugin}>{plugin}</option>
            ))}
          </Select>
        </ModalContent>
        <ModalFooter>
          <Button onClick={handleAddPlugin}>OK</Button>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default PluginSelector;
