/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetchInitialData } from './loadingSlice.js';

const DEFAULT_CHANNEL_ID = 1;

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    deleteChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);

      if (state.currentChannelId === payload) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
    },
    changeChannelName: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      channelsAdapter.addMany(state, channels);
      state.currentChannelId = currentChannelId;
    });
  },
});

const selectChannelsInfo = (state) => state.channelsInfo;

const selectState = (state) => state;

const channelsSelectors = channelsAdapter.getSelectors(selectChannelsInfo);

export const selectCurrentChannelId = createSelector(
  selectChannelsInfo,
  (channelsInfo) => channelsInfo.currentChannelId,
);

export const selectChannels = channelsSelectors.selectAll;

export const selectCurrentChannel = createSelector(
  selectState,
  selectCurrentChannelId,
  (state, currentChannelId) => channelsSelectors.selectById(state, currentChannelId),
);

export const {
  setChannel, addChannel, deleteChannel, changeChannelName,
} = channelsSlice.actions;

export default channelsSlice.reducer;
