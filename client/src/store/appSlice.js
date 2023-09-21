import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: '',
};

export const appSlice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    sendError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = '';
    },
  },
});

export const { startLoading, endLoading, sendError, resetError } = appSlice.actions;

export default appSlice.reducer;
