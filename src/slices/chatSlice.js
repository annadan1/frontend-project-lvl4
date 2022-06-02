import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';
/* eslint no-param-reassign: "error" */

export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async (headers) => {
    const { data } = await axios.get(routes.usersPath(), {
      headers,
    });
    return data;
  },
);

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    changeChannelId(state, { payload }) {
      state.currentChannelId = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, { payload }) => {
      const channelId = payload.id;
      const channel = state.channels.find((c) => c.id === channelId);
      if (!channel) return;
      channel.name = payload.name;
    },
    removeChannel: (state, { payload }) => {
      const channelId = payload.id;
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
    },
  },
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
