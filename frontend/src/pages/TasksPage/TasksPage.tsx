// src/pages/TasksPage/TasksPage.tsx
import React from 'react';
import TaskContainer from '../../containers/TaskContainer/TaskContainer';
import Navbar from '../../components/Navbar/Navbar';
import { TasksPageContainer, MainContent, TaskList, Title, Subtitle } from './TasksPage.styles';

const TasksPage: React.FC = () => {
  return (
    <TasksPageContainer>
      <Navbar />
      <MainContent>
        <Title>Tasks</Title>
        <Subtitle>Select a task to view details</Subtitle>
        <TaskList>
          <TaskContainer />
        </TaskList>
      </MainContent>
    </TasksPageContainer>
  );
};

export default TasksPage;
