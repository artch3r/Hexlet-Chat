import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
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

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  channels: [],
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

// export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;