import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App.jsx';
import chatsReducer, { actions } from './slices/chatSlice.js';
import resources from './locales/index.js';
import SocketProvider from './provider/SocketProvider.jsx';

export default () => {
  const chat = document.getElementById('chat');
  const root = createRoot(chat);
  const socket = io();
  const store = configureStore({
    reducer: {
      chats: chatsReducer,
    },
  });

  const i18next = i18n.createInstance();
  const getI18N = async () => {
    await i18next.use(initReactI18next).init({
      lng: 'ru',
      debug: false,
      resources,
    });
  };
  getI18N();

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </Provider>
    </BrowserRouter>,
  );
};
