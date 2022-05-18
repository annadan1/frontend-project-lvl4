import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes.js';

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
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
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
