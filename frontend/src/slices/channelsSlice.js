import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const fetchInitialData = createAsyncThunk(
  '/api/v1/data',
  async () => {
    const { data } = await axios.get('../../api/v1/data', { headers: getAuthHeader() });
    return data;
  },
);

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
      const newChannels = state.channels.filter((channel) => channel.id !== payload);
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

export const { setChannel, addChannel, deleteChannel } = channelsSlice.actions;

export default channelsSlice.reducer;