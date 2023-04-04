/* eslint-disable no-param-reassign */
import {
  createSlice, createAsyncThunk, createEntityAdapter, createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes';

export const fetchInitialData = createAsyncThunk('fetchInitialData', async (authHeader) => {
  const { data } = await axios.get(apiRoutes.getData(), {
    headers: authHeader,
  });
  return data;
});

const loadingAdapter = createEntityAdapter();

const initialState = loadingAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIdle: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(fetchInitialData.fulfilled, (state) => {
      state.error = null;
      state.status = 'finished';
    });
    builder.addCase(fetchInitialData.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error;
    });
  },
});

const selectLoading = (state) => state.loading;

export const selectLoadingInfo = createSelector(selectLoading, ({ status, error }) => ({ status, error }));

export const { setIdle } = loadingSlice.actions;

export default loadingSlice.reducer;
