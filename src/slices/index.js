import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice.js';

export default configureStore({
  reducer: {
    chats: chatReducer,
  },
});
