// src/components/CardNode/CardNode.tsx

import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CardContainer, TitleBand, StatusDot, ExecuteButton, StatusContainer, LoadingIcon, CloseButton, WarningIcon } from './CardNode.styles';
import { executeIcon, warningIcon, loadingIcon } from '../../assets';
import { executeCard, deleteCard } from '../../services/api';

interface CardNodeProps {
  data: {
    id: string;
    title: string;
    executed: boolean;
    inconsistent: boolean;
    onExecute: (id: string) => void;
    onUpdate: (updatedCard: any) => void;
    onDelete: (id: string) => void;
    taskId: string;
  };
}

const CardNode: React.FC<CardNodeProps> = ({ data }) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExecuting(true);
    try {
      const updatedCard = await executeCard(data.id);
      data.onUpdate(updatedCard);
    } catch (error) {
      console.error('Error executing card:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const confirmed = window.confirm('Are you sure you want to delete this card?');
    if (confirmed) {
      try {
        await deleteCard(data.id, data.taskId);
        data.onDelete(data.id);
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };

  return (
    <CardContainer>
      <TitleBand>{data.title}</TitleBand>
      <CloseButton onClick={handleDelete}>×</CloseButton>
      {data.inconsistent && <WarningIcon src={warningIcon} alt="Inconsistent" />}
      <StatusContainer>
        <ExecuteButton onClick={handleExecute} data-tooltip="Execute Card" disabled={isExecuting}>
          {isExecuting ? <LoadingIcon src={loadingIcon} alt="Loading" /> : <img src={executeIcon} alt="Execute" />}
        </ExecuteButton>
        <StatusDot status={data.executed ? 'executed' : 'not-executed'} />
      </StatusContainer>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </CardContainer>
  );
};

export default CardNode;
