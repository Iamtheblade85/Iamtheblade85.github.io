import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  balance: 0,
  waxConnected: false,
  anchorConnected: false,

  playerIsLogged: false,
  isLogged: false,
  token: null
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWaxData: (state, action) => {
      state.name = action.payload.name
      state.isLogged = action.payload.isLogged
      state.balance = action.payload.balance
    },
    setWaxBalance: (state, action) => {
      state.balance = action.payload
    },
    setWaxConnected: (state, action) => {
      state.waxConnected = action.payload;
    },
    setAnchorConnected: (state, action) => {
      state.anchorConnected = action.payload;
    },
    setPlayerIsLogged: (state, action) => {
      state.playerIsLogged = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload || null
    },
    setWaxLogout: (state) => {
      state.name = '';
      state.isLogged = false;
      state.balance = 0;
      state.waxConnected = false;
      state.anchorConnected = false;
    },
  }
});

export const {
  setWaxData,
  setWaxLogout,
  setWaxBalance,
  setWaxConnected,
  setAnchorConnected,
  setPlayerIsLogged,
  setToken
} = user.actions;
export default user.reducer;
