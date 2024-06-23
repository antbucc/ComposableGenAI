// src/pages/TasksPage/TasksPage.tsx
import React, { useState } from 'react';
import TaskContainer from '../../containers/TaskContainer/TaskContainer';
import Navbar from '../../components/Navbar/Navbar';
import { TasksPageContainer, TaskList, Title, ButtonsBox, RoundButton } from './TasksPage.styles';
import AddTaskPopover from '../../components/AddTaskPopover/AddTaskPopover';
import { ReactComponent as AddIcon } from '../../assets/add.svg'; // Import the SVG file

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
      <ButtonsBox>
        <RoundButton onClick={() => setIsPopoverOpen(true)}>
          <AddIcon className="icon" /> {/* Use the imported SVG component */}
        </RoundButton>
      </ButtonsBox>
      <AddTaskPopover isOpen={isPopoverOpen} onRequestClose={() => setIsPopoverOpen(false)} onTaskCreated={handleTaskCreated} />
      <Title>Tasks</Title>
      <TaskList>
        <TaskContainer refresh={refresh} />
      </TaskList>
    </TasksPageContainer>
  );
};

export default TasksPage;
