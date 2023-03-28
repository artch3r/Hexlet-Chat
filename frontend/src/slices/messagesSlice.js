/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice';
import { fetchInitialData } from './loadingSlice';

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
      state.messages = messages;
    });
    builder.addCase(deleteChannel, (state, { payload }) => {
      const { messages } = state;
      const newMessages = messages.filter(
        (message) => message.channelId !== payload,
      );
      state.messages = newMessages;
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
