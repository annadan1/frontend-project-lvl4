import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

export default () => {
  const chat = document.getElementById('chat');
  const root = createRoot(chat);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
};
