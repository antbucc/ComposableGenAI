// src/pages/TasksPage/TasksPage.tsx
import React, { useState } from 'react';
import TaskContainer from '../../containers/TaskContainer/TaskContainer';
import Navbar from '../../components/Navbar/Navbar';
import { TasksPageContainer, TaskList, Title, Button, Footer } from './TasksPage.styles';
import AddTaskPopover from '../../components/AddTaskPopover/AddTaskPopover';

const TasksPage: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleTaskCreated = () => {
    setIsPopoverOpen(false);
    setRefresh((prev) => !prev);
  };

  return (
    <TasksPageContainer>
      <Navbar />
      <AddTaskPopover isOpen={isPopoverOpen} onRequestClose={() => setIsPopoverOpen(false)} onTaskCreated={handleTaskCreated} />
      <Title>Tasks</Title>
      <TaskList>
        <TaskContainer refresh={refresh} />
      </TaskList>
      <Footer>
        <Button onClick={() => setIsPopoverOpen(true)}>Create New Task</Button>
      </Footer>
    </TasksPageContainer>
  );
};

export default TasksPage;
