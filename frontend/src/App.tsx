// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TaskDetailPage from './pages/TaskDetailPage/TaskDetailPage';
import TasksPage from './pages/TasksPage/TasksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
