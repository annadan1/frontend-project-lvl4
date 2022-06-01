import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App.jsx';
import chatsReducer, { actions } from './slices/chatSlice.js';
import modalsReducer from './slices/modalSlice.js';
import resources from './locales/index.js';
import SocketProvider from './provider/SocketProvider.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default async () => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  const i18next = i18n.createInstance();
  const socket = io();

  const store = configureStore({
    reducer: {
      chats: chatsReducer,
      modals: modalsReducer,
    },
  });

  await i18next.use(initReactI18next).init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

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

  return (
    <BrowserRouter>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <SocketProvider socket={socket}>
              <App />
            </SocketProvider>
          </Provider>
          <ToastContainer />
        </ErrorBoundary>
      </RollbarProvider>
    </BrowserRouter>
  );
};
