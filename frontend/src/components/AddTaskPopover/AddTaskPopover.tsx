// src/components/AddTaskPopover/AddTaskPopover.tsx
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { createTask } from '../../services/api';
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormButton,
  CloseButton,
  TitleBand,
} from '../AddCardPopover/AddCardPopover.styles'; // Reuse styles

interface AddTaskPopoverProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onTaskCreated: () => void;
}

const AddTaskPopover: React.FC<AddTaskPopoverProps> = ({
  isOpen,
  onRequestClose,
  onTaskCreated,
}) => {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask = {
      name,
      objective,
    };

    try {
      await createTask(newTask);
      onTaskCreated();
      onRequestClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Draggable handle=".draggable-handle" bounds="parent">
      <FormContainer style={{ top: '10%', left: '10%' }}>
        <TitleBand className="draggable-handle">Create New Task</TitleBand>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        <form onSubmit={handleSubmit}>
          <FormLabel>
            Name:
            <FormInput type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </FormLabel>
          <FormLabel>
            Objective:
            <FormInput type="text" value={objective} onChange={(e) => setObjective(e.target.value)} required />
          </FormLabel>
          <FormButton type="submit">Create Task</FormButton>
        </form>
      </FormContainer>
    </Draggable>
  );
};

export default AddTaskPopover;
