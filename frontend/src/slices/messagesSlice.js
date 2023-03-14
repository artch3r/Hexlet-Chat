import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData, deleteChannel } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
      const { messages } = payload;
      state.messages.push(...messages);
    });
    builder.addCase(deleteChannel, (state, { payload }) => {
      const messages = state.messages;
      const newMessages = messages.filter((message) => message.channelId !== payload);
      state.messages = newMessages;
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;