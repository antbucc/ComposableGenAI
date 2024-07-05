import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTaskById, executeCard, deleteCard, removeNextCard } from '../../services/api';
import Flow from '../../components/Flow/Flow';
import AddCardPopover from '../../components/AddCardPopover/AddCardPopover';
import Navbar from '../../components/Navbar/Navbar';
import { Node, Edge } from 'react-flow-renderer';
import { TaskInfoContainer, TaskInfoBox, TaskInfo, ButtonsBox, RoundButton, ContentContainer, PageContainer } from './TaskDetailPage.styles';
import DraggablePopover from '../../components/DraggablePopover/DraggablePopover';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import InstructionsPopup from '../../components/InstructionsPopup/InstructionsPopup';
import DetailModal from '../../components/DetailModal/DetailModal';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [openPopovers, setOpenPopovers] = useState<string[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [modalOutput, setModalOutput] = useState<{ content: string; card: any } | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleDeleteEdge = async (edgeId: string) => {
    try {
      const edge = edges.find((e) => e.id === edgeId);
      if (edge) {
        const { source, target } = edge;
        await removeNextCard(source, target);
        setEdges((eds) => eds.filter((e) => e.id !== edgeId));
      }
    } catch (error) {
      console.error('Error deleting edge:', error);
    }
  };

  const edgeOptions = {
    type: 'card',
    data: { onRemove: handleDeleteEdge },
  };

  const fetchTaskData = async () => {
    if (id) {
      try {
        const data = await fetchTaskById(id);
        setTask(data);

        const newNodes = data.cards.map((card: any, index: number) => ({
          id: card._id,
          data: {
            id: card._id,
            title: card.title,
            executed: card.executed,
            inconsistent: card.inconsistent,
            onExecute: handleExecute,
            onDelete: handleDelete,
            onCardUpdate: handleCardUpdate,
            taskId: data._id,
          },
          position: { x: 200 * index, y: 100 },
          type: 'cardNode',
          draggable: true,
        }));
        setNodes(newNodes);

        const newEdges: Edge[] = [];
        data.cards.forEach((card: any) => {
          card.nextCards.forEach((nextCardId: string) => {
            newEdges.push({
              id: `e${card._id}-${nextCardId}`,
              source: card._id,
              target: nextCardId,
              ...edgeOptions,
            });
          });
          card.previousCards.forEach((prevCardId: string) => {
            newEdges.push({
              id: `e${prevCardId}-${card._id}`,
              source: prevCardId,
              target: card._id,
              ...edgeOptions,
            });
          });
        });
        setEdges(newEdges);

        if (data.cards.length === 0) {
          setShowInstructions(true);
        }
      } catch (err) {
        setError('Failed to fetch task. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('Task ID is missing.');
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [id]);

  const handleCardCreated = () => {
    setIsPopoverOpen(false);
    fetchTaskData();
  };

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (!openPopovers.includes(node.id)) {
      setOpenPopovers((prev) => [...prev, node.id]);
    }
  }, [openPopovers]);

  const handleClosePopover = (cardId: string) => {
    setOpenPopovers((prev) => prev.filter((id) => id !== cardId));
  };

  const handleExecute = async (cardId: string) => {
    try {
      const updatedCard = await executeCard(cardId);
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === updatedCard._id) {
            node.data = {
              ...node.data,
              executed: updatedCard.executed,
              inconsistent: updatedCard.inconsistent,
            };
          }
          return node;
        })
      );
      fetchTaskData();
    } catch (error) {
      console.error('Error executing card:', error);
    }
  };

  const handleCardUpdate = (updatedCard: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === updatedCard._id) {
          node.data = {
            ...node.data,
            title: updatedCard.title,
            objective: updatedCard.objective,
            prompt: updatedCard.prompt,
            context: updatedCard.context,
            executed: updatedCard.executed,
            inconsistent: updatedCard.inconsistent,
          };
        }
        return node;
      })
    );
  };

  const handleDelete = async (cardId: string) => {
    try {
      await deleteCard(cardId, task._id);
      setNodes((nds) => nds.filter((node) => node.id !== cardId));
      setEdges((eds) => eds.filter((edge) => edge.source !== cardId && edge.target !== cardId));
      if (nodes.length === 1) {
        setShowInstructions(true);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleOpenModal = (content: string, card: any) => {
    setModalOutput({ content, card });
  };

  const handleCloseModal = () => {
    setModalOutput(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  function closeInstructions(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <PageContainer>
      <Navbar />
      <TaskInfoContainer>
        <TaskInfoBox>
          <TaskInfo>
            <h1>{task.name}</h1>
            <p>{task.objective}</p>
          </TaskInfo>
        </TaskInfoBox>
        <ButtonsBox>
          <RoundButton onClick={() => setIsPopoverOpen(true)}>
            <AddIcon className="icon" />
          </RoundButton>
        </ButtonsBox>
      </TaskInfoContainer>
      <ContentContainer>
        <Flow initialNodes={nodes} initialEdges={edges} onNodeClick={handleNodeClick} onExecute={handleExecute} />
      </ContentContainer>
      <AddCardPopover isOpen={isPopoverOpen} onRequestClose={() => setIsPopoverOpen(false)} taskId={task._id} currentCards={task.cards} onCardCreated={handleCardCreated} />
      {openPopovers.map((cardId, index) => (
        <DraggablePopover
          key={cardId}
          cardId={cardId}
          onRequestClose={() => handleClosePopover(cardId)}
          index={index}
          onExecute={handleExecute}
          onCardUpdate={handleCardUpdate}
          onOpenModal={handleOpenModal}
        />
      ))}
      {modalOutput && (
        <DetailModal
          title={modalOutput.content}
          onRequestClose={handleCloseModal}
          content={modalOutput.content}
          card={modalOutput.card}
        />
      )}
      {showInstructions && <InstructionsPopup onClose={closeInstructions} />}
    </PageContainer>
  );
};

export default TaskDetailPage;
