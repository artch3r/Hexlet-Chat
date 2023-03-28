/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from './loadingSlice.js';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);

      const currentUser = JSON.parse(localStorage.getItem('userId')).username;
      if (currentUser === payload.author) {
        state.currentChannelId = payload.id;
      }
    },
    deleteChannel(state, { payload }) {
      const newChannels = state.channels.filter(
        (channel) => channel.id !== payload,
      );
      state.channels = newChannels;

      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
    },
    changeChannelName(state, { payload }) {
      const currentChannels = state.channels;
      const filteredChannels = currentChannels.filter(
        (channel) => channel.id !== payload.id,
      );
      const newChannels = [...filteredChannels, payload];
      state.channels = newChannels;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    });
  },
});

export const {
  setChannel, addChannel, deleteChannel, changeChannelName,
} = channelsSlice.actions;

export default channelsSlice.reducer;
