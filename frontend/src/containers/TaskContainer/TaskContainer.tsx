// src/containers/TaskContainer/TaskContainer.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTasks } from '../../services/api';
import { TaskContainerWrapper, TaskItem } from './TaskContainer.styles';

interface Task {
  _id: string;
  name: string;
  objective: string;
  cards: any[]; // Replace `any` with the appropriate type if available
}

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <TaskContainerWrapper>
      {tasks.map((task) => (
        <TaskItem key={task._id} onClick={() => navigate(`/task/${task._id}`)}>
          <h2>{task.name}</h2>
          <p>{task.objective}</p>
          <p>Number of Cards: {task.cards.length}</p>
        </TaskItem>
      ))}
    </TaskContainerWrapper>
  );
};

export default TaskContainer;
