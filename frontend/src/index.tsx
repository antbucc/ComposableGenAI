// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import the index.css file
import GlobalStyles from './styles/GobalStyles.styles';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <GlobalStyles /> {/* Apply global styles */}
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root container missing in index.html');
}
