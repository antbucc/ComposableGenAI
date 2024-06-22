// src/components/Card/Card.tsx

import React from 'react';
import { CardContainer, CardTitle, StatusDot, InconsistentMessage } from './Card.styles';

interface CardProps {
  title: string;
  objective: string;
  executed: boolean;
  evaluated: boolean;
  inconsistent: boolean;
}

const Card: React.FC<CardProps> = ({ title, objective, executed, evaluated, inconsistent }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <p>{objective}</p>
      <div>
        <p>Status:</p>
        <StatusDot status={executed ? 'executed' : 'not-executed'} />
        <span>Executed</span>
        <StatusDot status={evaluated ? 'evaluated' : 'not-evaluated'} />
        <span>Evaluated</span>
        {inconsistent && <InconsistentMessage>Inconsistent</InconsistentMessage>}
      </div>
    </CardContainer>
  );
};

export default Card;
