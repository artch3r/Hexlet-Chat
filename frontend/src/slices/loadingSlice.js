/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchInitialData = createAsyncThunk('fetchInitialData', async (authHeader) => {
  const { data } = await axios.get(routes.apiGetData(), {
    headers: authHeader,
  });
  return data;
});

const initialState = {
  status: 'idle',
  error: null,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchInitialData.fulfilled, (state) => {
      state.status = 'finished';
      state.error = null;
    });
    builder.addCase(fetchInitialData.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error;
    });
  },
});

export default loadingSlice.reducer;
