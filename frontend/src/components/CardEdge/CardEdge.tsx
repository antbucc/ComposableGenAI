// src/components/CardEdge/CardEdge.tsx

import React, { MouseEvent } from 'react';
import { EdgeProps, getBezierPath } from 'react-flow-renderer';
import { EdgeButton } from './CardEdge.styles';
import closeIcon from '../../assets/close.svg';

const CardEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (event: MouseEvent<SVGImageElement>) => {
    event.stopPropagation();
    if (window.confirm('Do you want to delete this edge?')) {
      data.onRemove(id);
    }
  };

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} />
      <EdgeButton
        href={closeIcon}
        x={(sourceX + targetX) / 2 - 10}
        y={(sourceY + targetY) / 2 - 10}
        width={20}
        height={20}
        onClick={onEdgeClick}
      />
    </>
  );
};

export default CardEdge;
