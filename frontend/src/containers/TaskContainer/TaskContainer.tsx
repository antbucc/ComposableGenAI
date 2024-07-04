// src/containers/TaskContainer/TaskContainer.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../../services/api';
import { TaskContainerWrapper, TaskItem, DeleteButton } from './TaskContainer.styles';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg'; // Import the delete icon

interface Task {
  _id: string;
  name: string;
  objective: string;
  cards: any[];
}

interface TaskContainerProps {
  refresh: boolean;
}

const TaskContainer: React.FC<TaskContainerProps> = ({ refresh }) => {
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
  }, [refresh]); // Refetch tasks when `refresh` prop changes

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again later.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <TaskContainerWrapper>
      {tasks.map((task) => (
        <TaskItem key={task._id} onClick={() => navigate(`/task/${task._id}`)}>
          <h2>{task.name}</h2>
          <p>{task.objective}</p>
          <p>Number of Cards: {task.cards.length}</p>
          <DeleteButton onClick={(e) => { e.stopPropagation(); handleDelete(task._id); }}>
            <DeleteIcon />
          </DeleteButton>
        </TaskItem>
      ))}
    </TaskContainerWrapper>
  );
};

export default TaskContainer;
