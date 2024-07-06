import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { createTask } from '../../services/api';
import { GENERATIVE_MODELS } from '../../config/config';
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormButton,
  CloseButton,
  TitleBand,
  CheckboxLabel,
  FormSelect,
  LoadingModal,
  LoadingText,
} from './AddTaskPopover.styles'; // Reuse styles

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
  const [generate, setGenerate] = useState(false);
  const [generativeModel, setGenerativeModel] = useState(GENERATIVE_MODELS[0].value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const newTask = {
      name,
      objective,
      generate,
      generativeModel: generate ? generativeModel : undefined,
    };

    try {
      await createTask(newTask);
      onTaskCreated();
      onRequestClose();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsLoading(false);
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
          <CheckboxLabel>
            <input type="checkbox" checked={generate} onChange={(e) => setGenerate(e.target.checked)} />
            Generate cards automatically
          </CheckboxLabel>
          {generate && (
            <FormLabel>
              Generative Model:
              <FormSelect value={generativeModel} onChange={(e) => setGenerativeModel(e.target.value)}>
                {GENERATIVE_MODELS.map(model => (
                  <option key={model.value} value={model.value}>{model.label}</option>
                ))}
              </FormSelect>
            </FormLabel>
          )}
          <FormButton type="submit">Create Task</FormButton>
        </form>
        {isLoading && (
          <LoadingModal>
            <LoadingText>Your task is being generated...</LoadingText>
          </LoadingModal>
        )}
      </FormContainer>
    </Draggable>
  );
};

export default AddTaskPopover;
