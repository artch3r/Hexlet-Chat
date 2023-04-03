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
      const newChannels = state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return payload;
        }

        return channel;
      });

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
