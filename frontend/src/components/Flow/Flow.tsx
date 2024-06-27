import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  OnEdgesDelete,
  OnConnect
} from 'react-flow-renderer';
import dagre from 'dagre';
import { setNextCard, removeNextCard } from '../../services/api';
import CardNode from './CardNode';
import CardEdge from '../CardEdge/CardEdge';
import { FlowContainer } from './Flow.styles';

interface FlowProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onExecute: (id: string) => void;
}

const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'LR', nodesep: 100, ranksep: 100 });

const nodeTypes = {
  cardNode: CardNode,
};

const edgeTypes = {
  card: CardEdge,
};

const Flow: React.FC<FlowProps> = ({ initialNodes, initialEdges, onNodeClick, onExecute }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(async (params: Edge | Connection) => {
    const newEdge = { ...params, type: 'card', data: { onRemove: handleDeleteEdge } };
    setEdges((eds) => addEdge(newEdge, eds));

    const { source, target } = params;

    if (source && target) {
      try {
        await setNextCard(source, [target]);
      } catch (error) {
        console.error('Error setting card links:', error);
      }
    }
  }, [setEdges]);

  useEffect(() => {
    initialNodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    initialEdges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = initialNodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
      node.type = 'cardNode';
      node.data = { ...node.data, onExecute, onDelete };
      return node;
    });

    setNodes(layoutedNodes);
  }, [initialNodes, initialEdges]);

  const onDelete = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const onEdgesDelete: OnEdgesDelete = useCallback(async (edgesToDelete: Edge[]) => {
    for (const edge of edgesToDelete) {
      const { source, target } = edge;
      try {
        await removeNextCard(source, target);
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      } catch (error) {
        console.error('Error removing edge:', error);
      }
    }
  }, [setEdges]);

  const handleDeleteEdge = async (id: string) => {
    const edge = edges.find((e) => e.id === id);
    if (edge) {
      const { source, target } = edge;
      try {
        await removeNextCard(source, target);
        setEdges((eds) => eds.filter((e) => e.id !== id));
      } catch (error) {
        console.error('Error removing edge:', error);
      }
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

  return (
    <FlowContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges.map(edge => ({ ...edge, type: 'card', data: { onRemove: handleDeleteEdge } }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultZoom={0.8}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </FlowContainer>
  );
};

export default Flow;
