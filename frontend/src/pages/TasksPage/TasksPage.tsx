// src/pages/TasksPage/TasksPage.tsx
import React, { useState, useEffect } from 'react';
import TaskContainer from '../../containers/TaskContainer/TaskContainer';
import Navbar from '../../components/Navbar/Navbar';
import { TasksPageContainer, TaskList, Title, ButtonsBox, RoundButton, Section, SectionTitle, SectionContent, Footer, ToggleButton } from './TasksPage.styles';
import AddTaskPopover from '../../components/AddTaskPopover/AddTaskPopover';
import { ReactComponent as AddIcon } from '../../assets/add.svg'; // Import the SVG file
import { ReactComponent as InfoIcon } from '../../assets/info.svg'; // Import the info SVG file
import { ReactComponent as TaskIcon } from '../../assets/list.svg'; // Import the task SVG file
import { fetchTasks } from '../../services/api';

const TasksPage: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };

    getTasks();
  }, [refresh]);

  const handleTaskCreated = () => {
    setIsPopoverOpen(false);
    setRefresh((prev) => !prev);
  };

  const toggleInfoSection = () => {
    setShowInfo((prev) => !prev);
  };

  return (
    <TasksPageContainer>
      <Navbar />
      <ButtonsBox>
        <RoundButton onClick={() => setIsPopoverOpen(true)}>
          <AddIcon className="icon" /> {/* Use the imported SVG component */}
        </RoundButton>
        <ToggleButton onClick={toggleInfoSection} disabled={tasks.length === 0}>
          {showInfo ? <TaskIcon className="icon" /> : <InfoIcon className="icon" />}
        </ToggleButton>
      </ButtonsBox>
      <AddTaskPopover isOpen={isPopoverOpen} onRequestClose={() => setIsPopoverOpen(false)} onTaskCreated={handleTaskCreated} />
      <Title>Tasks</Title>
      {tasks.length === 0 || showInfo ? (
        <TaskList>
          {tasks.length === 0 ? (
          <Section>
            <SectionTitle>No Tasks Available</SectionTitle>
            <SectionContent>To get started, click the &quot;+&quot; button on the right to create a new task.</SectionContent>
          </Section>
          ) : null}
          <Section>
            <SectionTitle>Concept of Cards and Tasks</SectionTitle>
            <SectionContent>
              <p>
                The core concept of this project revolves around &quot;cards.&quot; Cards represent discrete units of generative AI tasks, each containing specific instructions, inputs, and configurations. They are designed to be flexible and modular, enabling users to easily create, modify, and manage AI tasks.
              </p>
              <ul>
                <li><strong>Title:</strong> A descriptive title for the card.</li>
                <li><strong>Objective:</strong> The main goal or purpose of the card.</li>
                <li><strong>Prompt:</strong> The input prompt for the generative AI model.</li>
                <li><strong>Generative Model:</strong> The AI model used to generate the output.</li>
                <li><strong>Context:</strong> Additional context or information to be used by the AI model, including the outputs from previous cards.</li>
                <li><strong>Previous Cards:</strong> References to other cards whose outputs are used as context in the current card.</li>
                <li><strong>Next Cards:</strong> References to other cards that will use the current card&apos;s output as context.</li>
                <li><strong>Output:</strong> The generated result from the AI model, stored as an execution data document.</li>
              </ul>
              <h4>Evaluation Metrics</h4>
              <ul>
                <li><strong>Coherence:</strong> Logical and consistent flow of sentences.</li>
                <li><strong>Relevance:</strong> Pertinence to the given input or query.</li>
                <li><strong>Fluency:</strong> Grammatical accuracy and appropriate vocabulary.</li>
                <li><strong>Groundedness:</strong> Alignment with provided source data.</li>
                <li><strong>Average:</strong> The average score of all evaluation criteria.</li>
              </ul>
              <p>These metrics help in assessing the effectiveness and reliability of the generated outputs, ensuring that they meet the desired standards and objectives.</p>
            </SectionContent>
          </Section>
        </TaskList>
      ) : (
        <TaskList>
          <TaskContainer refresh={refresh} />
        </TaskList>
      )}
    </TasksPageContainer>
  );
};

export default TasksPage;
