// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot for React 18
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root using the React 18 API
const root = createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
