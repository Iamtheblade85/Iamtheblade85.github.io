import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setPlayerIsLogged, setToken } from '../UserReducer';
import PlayerService from './player.service';
import { toast } from 'react-toastify';

const initialState = {

};

export const signupPlayer = createAsyncThunk(
  'player/signupPlayer',
  async ({ data, navigate, setFieldErrors, setError }) => {
    try {
      await PlayerService.signupPlayer(data)
      toast.success("Congratulations! Your account successfully created")
      navigate('/login')
    }
    catch (err) {
      if (Object.values(err.response?.data?.result?.data?.errors || {}).length) {
        setFieldErrors(err.response?.data?.result?.data.errors)
      }
      else if (err.response?.data?.result?.message) {
        setError(err.response?.data?.result?.message)
      }
      else {
        console.log(err.message)
      }
    }
  }
)

export const loginPlayer = createAsyncThunk(
  'player/loginPlayer',
  async ({ data, navigate, setFieldErrors, setError }, { dispatch }) => {
    try {
      const res = await PlayerService.loginPlayer(data)
      dispatch(setToken(res.data?.result))
      await dispatch(getAuthorizedPlayer())
      navigate('/home')
    }
    catch (err) {
      if (Object.values(err.response?.data?.result?.data?.errors || {}).length) {
        setFieldErrors(err.response?.data?.result?.data?.errors)
      }
      else if (err.response?.data?.result?.message) {
        setError(err.response?.data?.result?.message)
      }
      else {
        console.log(err.message)
      }
    }
  }
)

export const getAuthorizedPlayer = createAsyncThunk(
  'player/getAuthorizedPlayer',
  async (_, { dispatch, getState }) => {
    try {
      const state = getState()
      const res = await PlayerService.getAuthorizedPlayer(state.user.token)
      dispatch(setPlayerData(res.data.result))
      dispatch(setPlayerIsLogged(true))
    }
    catch (err) {
      dispatch(logoutPlayer())
      dispatch(setPlayerIsLogged(false))
      dispatch(setToken())
      console.log(err.message)
    }
  }
)

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerData: (state, action) => action.payload,
    logoutPlayer: () => initialState
  }
});

export const {
  setPlayerData,
  logoutPlayer
} = playerSlice.actions;

export default playerSlice.reducer;
