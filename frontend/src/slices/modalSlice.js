/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const MODAL_TYPES = {
  addChannel: 'addChannel',
  renameChannel: 'renameChannel',
  deleteChannel: 'deleteChannel',
};

const modalAdapter = createEntityAdapter();

const initialState = modalAdapter.getInitialState({
  isOpened: false,
  type: null,
  extra: null,
});

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.type = payload.type;
      state.extra = payload.extra;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
  },
});

const selectModal = (state) => state.modal;

export const selectModalInfo = createSelector(
  selectModal,
  ({ isOpened, type, extra }) => ({ isOpened, type, extra }),
);

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
