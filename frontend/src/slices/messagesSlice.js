/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { deleteChannel, selectCurrentChannelId } from './channelsSlice';
import { fetchInitialData } from './loadingSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
      const { messages } = payload;
      messagesAdapter.addMany(state, messages);
    });
    builder.addCase(deleteChannel, (state, { payload }) => {
      const messages = Object.values(state.entities);
      const messagesIdsToRemove = messages
        .filter((message) => message.channelId === payload)
        .map((message) => message.id);
      messagesAdapter.removeMany(state, messagesIdsToRemove);
    });
  },
});

const selectMessagesInfo = (state) => state.messagesInfo;

const messagesSelectors = messagesAdapter.getSelectors(selectMessagesInfo);

const selectMessages = messagesSelectors.selectAll;

export const selectCurrentMessages = createSelector(
  selectMessages,
  selectCurrentChannelId,
  (messages, currentChannelId) => messages.filter((message) => message.channelId === currentChannelId),
);

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
