import * as ReactDOMClient from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import App from './App.jsx';
import chatsReducer, { actions } from './slices/chatSlice.js';
import modalsReducer from './slices/modalSlice.js';
import resources from './locales/index.js';
import SocketProvider from './provider/SocketProvider.jsx';

export default async () => {
  injectStyle();
  const container = document.getElementById('chat');
  const root = ReactDOMClient.createRoot(container);
  const socket = io();
  const store = configureStore({
    reducer: {
      chats: chatsReducer,
      modals: modalsReducer,
    },
  });

  const i18next = i18n.createInstance();

  await i18next.use(initReactI18next).init({
    lng: 'ru',
    debug: false,
    resources,
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel(payload));
  });

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </Provider>
      <ToastContainer />
    </BrowserRouter>,
  );
};
