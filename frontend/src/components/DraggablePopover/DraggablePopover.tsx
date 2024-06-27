// src/components/DraggablePopover/DraggablePopover.tsx

import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { fetchCardById, fetchPreviousCardsOutputs, executeCard, evaluateCard, updateCard } from '../../services/api';
import {
  CloseButton,
  PopoverContent,
  PopoverContainer,
  Section,
  SectionTitle,
  SectionContent,
  Label,
  Value,
  ButtonContainer,
  ExecuteButton,
  EvaluateButton,
  LoadingMessage,
  EditButton,
  ResolveButton,
  TitleBand,
  CopyButton,
  ModalButton,
  OutputSection,
  ButtonGroup
} from './DraggablePopover.styles';
import {
  executeIcon,
  evaluateIcon,
  editIcon,
  doneIcon,
  reviewIcon,
  copyIcon,
  openNewIcon
} from '../../assets';

interface DraggablePopoverProps {
  cardId: string;
  onRequestClose: () => void;
  index: number;
  onExecute: (id: string) => void;
  onCardUpdate: (card: any) => void;
  onOpenModal: (output: string) => void;
}

const DraggablePopover: React.FC<DraggablePopoverProps> = ({
  cardId,
  onRequestClose,
  index,
  onExecute,
  onCardUpdate,
  onOpenModal
}) => {
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isPromptCollapsed, setIsPromptCollapsed] = useState(false);
  const [isContextCollapsed, setIsContextCollapsed] = useState(true);
  const [isExampleOutputCollapsed, setIsExampleOutputCollapsed] = useState(true);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(true);
  const [previousCardsOutputs, setPreviousCardsOutputs] = useState<{ [key: string]: string | null }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCard, setUpdatedCard] = useState<any>({});
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    const getCard = async () => {
      try {
        const data = await fetchCardById(cardId);
        setCard(data);
        setUpdatedCard(data);
      } catch (err) {
        setError('Failed to fetch card. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCard();
  }, [cardId]);

  useEffect(() => {
    const getPreviousCardsOutputs = async () => {
      try {
        const data = await fetchPreviousCardsOutputs(cardId);
        setPreviousCardsOutputs(data);
      } catch (err) {
        console.error('Failed to fetch previous cards outputs', err);
      }
    };

    if (card) {
      getPreviousCardsOutputs();
    }
  }, [card]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const calculateLeftPosition = (index: number) => {
    const position = (index * 33 + 2) % 100;
    return position <= 75 ? position : 0;
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setIsEvaluating(true);
    try {
      await executeCard(cardId);
      const updatedCard = await fetchCardById(cardId);
      setCard(updatedCard);
      onCardUpdate(updatedCard);
    } catch (error) {
      console.error('Error executing card:', error);
    } finally {
      setIsExecuting(false);
      setIsEvaluating(false);
    }
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setIsExecuting(true);
    try {
      await evaluateCard(cardId);
      const updatedCard = await fetchCardById(cardId);
      setCard(updatedCard);
      onExecute(cardId);
      onCardUpdate(updatedCard);
    } catch (error) {
      console.error('Error evaluating card:', error);
    } finally {
      setIsEvaluating(false);
      setIsExecuting(false);
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        await updateCard(updatedCard);
        setCard(updatedCard);
        onCardUpdate(updatedCard);
      } catch (error) {
        console.error('Error updating card:', error);
      }
    }
    setIsEditing(!isEditing);
    setIsContextCollapsed(false);
    setIsPromptCollapsed(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedCard((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleResolveInconsistency = async () => {
    try {
      const resolvedCard = { ...updatedCard, inconsistent: false };
      await updateCard(resolvedCard);
      setCard(resolvedCard);
      onCardUpdate(resolvedCard);
    } catch (error) {
      console.error('Error resolving inconsistency:', error);
    }
  };

  const handleCopyClick = async () => {
    if (card && card.output && card.output.generatedText) {
      try {
        await navigator.clipboard.writeText(card.output.generatedText);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    }
  };

  const handleModalOpen = () => {
    if (card && card.output && card.output.generatedText) {
      onOpenModal(card.output.generatedText);
    }
  };


  return (
    <Draggable handle=".draggable-handle" bounds="parent">
      <PopoverContainer
        style={{
          top: '25%',
          left: `${calculateLeftPosition(index)}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <TitleBand className="draggable-handle">Card Details</TitleBand>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        <ResolveButton onClick={handleResolveInconsistency}>
          <img src={reviewIcon} alt="Resolve" />
        </ResolveButton>
        <EditButton onClick={handleEditClick}>
          <img src={isEditing ? doneIcon : editIcon} alt="Edit" />
        </EditButton>
        {card && (
          <>
            <PopoverContent>
              <Section>
                <Label>Title:</Label>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={updatedCard.title}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{card.title}</Value>
                )}
              </Section>
              <Section>
                <Label>Objective:</Label>
                {isEditing ? (
                  <input
                    type="text"
                    name="objective"
                    value={updatedCard.objective}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{card.objective}</Value>
                )}
              </Section>
              <Section>
                <SectionTitle onClick={() => setIsPromptCollapsed(!isPromptCollapsed)}>
                  Prompt {isPromptCollapsed ? '▼' : '▲'}
                </SectionTitle>
                <SectionContent isCollapsed={isPromptCollapsed}>
                  <div>
                    <Label>Prompt:</Label>
                    {isEditing ? (
                      <textarea
                        name="prompt"
                        value={updatedCard.prompt}
                        onChange={handleChange}
                      ></textarea>
                    ) : (
                      <Value>{card.prompt}</Value>
                    )}
                  </div>
                </SectionContent>
              </Section>
              <Section>
                <SectionTitle onClick={() => setIsContextCollapsed(!isContextCollapsed)}>
                  Context {isContextCollapsed ? '▼' : '▲'}
                </SectionTitle>
                <SectionContent isCollapsed={isContextCollapsed}>
                  <div>
                    <Label>Context:</Label>
                    {isEditing ? (
                      <textarea
                        name="context"
                        value={updatedCard.context}
                        onChange={handleChange}
                      ></textarea>
                    ) : (
                      <Value>{card.context}</Value>
                    )}
                  </div>
                  {card.previousCards && Object.keys(card.previousCards).length > 0 && !isEditing && (
                    <div>
                      <Label>Previous Cards Outputs:</Label>
                      {Object.entries(previousCardsOutputs).map(([prevCardId, output]) => (
                        <div key={prevCardId}>
                          <Value>{output || 'No output generated'}</Value>
                        </div>
                      ))}
                    </div>
                  )}
                  <Section>
                    <SectionTitle onClick={() => setIsExampleOutputCollapsed(!isExampleOutputCollapsed)}>
                      Example Output {isExampleOutputCollapsed ? '▼' : '▲'}
                    </SectionTitle>
                    <SectionContent isCollapsed={isExampleOutputCollapsed}>
                      <div>
                        {isEditing ? (
                          <textarea
                            name="exampleOutput"
                            value={updatedCard.exampleOutput}
                            onChange={handleChange}
                          ></textarea>
                        ) : (
                          <Value>{card.exampleOutput || 'No example output provided'}</Value>
                        )}
                      </div>
                    </SectionContent>
                  </Section>
                </SectionContent>
              </Section>
              <OutputSection>
                <SectionTitle onClick={() => setIsOutputCollapsed(!isOutputCollapsed)}>
                  Output {isOutputCollapsed ? '▼' : '▲'}
                </SectionTitle>
                <ButtonGroup>
                  <CopyButton onClick={handleCopyClick}>
                    <img src={isCopying ? doneIcon : copyIcon} alt="Copy" />
                  </CopyButton>
                  <ModalButton onClick={handleModalOpen}>
                    <img src={openNewIcon} alt="Open" />
                  </ModalButton>
                </ButtonGroup>
              </OutputSection>
              <SectionContent isCollapsed={isOutputCollapsed}>
                <div>
                  {card.output ? (
                    <>
                      <Label>Generated Text:</Label>
                      <Value>{card.output.generatedText}</Value>
                    </>
                  ) : (
                    <Value>No output generated yet</Value>
                  )}
                </div>
              </SectionContent>
              {card.output && card.output.evaluationMetrics && (
                <Section>
                  <h3>Evaluation Metrics</h3>
                  {card.output.evaluationMetrics.map((metric: any) => (
                    <div key={metric._id}>
                      <Label>{metric.type}:</Label>
                      <Value>{metric.evaluationResult}</Value>
                    </div>
                  ))}
                </Section>
              )}
            </PopoverContent>
            <ButtonContainer>
              <ExecuteButton
                onClick={handleExecute}
                data-tooltip="Execute Card"
                disabled={isExecuting}
              >
                <img src={executeIcon} alt="Execute" />
              </ExecuteButton>
              {isExecuting || isEvaluating ? (
                <LoadingMessage>Loading...</LoadingMessage>
              ) : (
                <div style={{ width: '100px' }}></div>
              )}
              <EvaluateButton
                onClick={handleEvaluate}
                data-tooltip="Evaluate Card"
                disabled={isEvaluating || !card.executed}
              >
                <img src={evaluateIcon} alt="Evaluate" />
              </EvaluateButton>
            </ButtonContainer>
          </>
        )}
      </PopoverContainer>
    </Draggable>
  );
};

export default DraggablePopover;
