import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  result: {
    _id: '',
    username: '',
  },
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { result, token } = action.payload;
      localStorage.setItem('auth', JSON.stringify({ result, token }));
      state.result = result;
      state.token = token;
    },
    userLogout: (state) => {
      localStorage.removeItem('auth'); 
      state.result = {};
      state.token = '';
    },
  },
});

export const { userLogin, userLogout , logined } = authSlice.actions;

export default authSlice.reducer;
