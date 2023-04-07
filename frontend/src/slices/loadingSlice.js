/* eslint-disable no-param-reassign */
import {
  createSlice, createAsyncThunk, createEntityAdapter, createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../routes';

export const MAIN_DATA_LOADING_STATUS = {
  idle: 'idle',
  loading: 'loading',
  finished: 'finished',
  error: 'error',
};

export const fetchInitialData = createAsyncThunk('fetchInitialData', async (authHeader) => {
  const { data } = await axios.get(apiRoutes.getData(), {
    headers: authHeader,
  });
  return data;
});

const loadingAdapter = createEntityAdapter();

const initialState = loadingAdapter.getInitialState({
  status: MAIN_DATA_LOADING_STATUS.idle,
  error: null,
});

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIdle: (state) => {
      state.status = MAIN_DATA_LOADING_STATUS.idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.pending, (state) => {
      state.error = null;
      state.status = MAIN_DATA_LOADING_STATUS.loading;
    });
    builder.addCase(fetchInitialData.fulfilled, (state) => {
      state.error = null;
      state.status = MAIN_DATA_LOADING_STATUS.finished;
    });
    builder.addCase(fetchInitialData.rejected, (state, action) => {
      state.status = MAIN_DATA_LOADING_STATUS.error;
      state.error = action.error;
    });
  },
});

const selectLoading = (state) => state.loading;

export const selectLoadingInfo = createSelector(
  selectLoading,
  ({ status, error }) => ({ status, error }),
);

export const { setIdle } = loadingSlice.actions;

export default loadingSlice.reducer;
