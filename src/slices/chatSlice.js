import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async () => {
    const { data } = await axios.get(routes.usersPath(), {
      headers: getAuthHeader(),
    });
    return data;
  },
);

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: 1,
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        const { channels, messages, currentChannelId } = action.payload;
        state.channels = channels;
        state.messages = messages;
        state.currentChannelId = currentChannelId;
      });
  },
});

export const { actions } = chatSlice;

export default chatSlice.reducer;
