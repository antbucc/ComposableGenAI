// src/components/Flow/CardNode.tsx

import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CardContainer, TitleBand, StatusDot, ExecuteButton, StatusContainer, LoadingMessage, CloseButton, WarningIcon } from './CardNode.styles';
import executeIcon from '../../assets/execute.svg';
import warningIcon from '../../assets/warning.svg'; // Import warning icon
import { executeCard, deleteCard } from '../../services/api'; // Import deleteCard API

interface CardNodeProps {
  data: {
    id: string;
    title: string;
    executed: boolean;
    inconsistent: boolean;
    onExecute: (id: string) => void;
    onUpdate: (updatedCard: any) => void;
    onDelete: (id: string) => void; // Add onDelete function
    taskId: string; // Add taskId property
  };
}

const CardNode: React.FC<CardNodeProps> = ({ data }) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent popover from opening
    setIsExecuting(true);
    try {
      const updatedCard = await executeCard(data.id); // Ensure the ID is passed here
      data.onUpdate(updatedCard); // Notify the parent about the update
    } catch (error) {
      console.error('Error executing card:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent popover from opening
    const confirmed = window.confirm('Are you sure you want to delete this card?');
    if (confirmed) {
      try {
        await deleteCard(data.id, data.taskId);
        data.onDelete(data.id); // Notify the parent about the deletion
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };

  return (
    <CardContainer>
      <TitleBand>{data.title}</TitleBand>
      <CloseButton onClick={handleDelete}>×</CloseButton>
      {data.inconsistent && <WarningIcon src={warningIcon} alt="Inconsistent" />} {/* Add warning icon */}
      {isExecuting && <LoadingMessage>Loading...</LoadingMessage>}
      <StatusContainer>
        <ExecuteButton onClick={handleExecute} data-tooltip="Execute Card" disabled={isExecuting}>
          <img src={executeIcon} alt="Execute" />
        </ExecuteButton>
        <StatusDot status={data.executed ? 'executed' : 'not-executed'} />
      </StatusContainer>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </CardContainer>
  );
};

export default CardNode;
