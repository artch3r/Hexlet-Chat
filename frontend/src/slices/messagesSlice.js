import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchInitialData } from './channelsSlice';

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
  },
});

export const { addMessage } = messagesSlice.actions;

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messagesInfo);

export default messagesSlice.reducer;