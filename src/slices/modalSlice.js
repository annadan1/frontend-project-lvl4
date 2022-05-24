import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  open: false,
  idForModalAction: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      state.type = payload;
      state.open = true;
    },
    hideModal(state) {
      state.type = null;
      state.open = false;
    },
    changeIdForModalAction(state, { payload }) {
      state.idForModalAction = payload;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
