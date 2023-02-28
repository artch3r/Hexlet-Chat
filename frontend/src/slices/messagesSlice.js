import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
      state.messages = payload.messages;
    });
  },
});

export default messagesSlice.reducer;