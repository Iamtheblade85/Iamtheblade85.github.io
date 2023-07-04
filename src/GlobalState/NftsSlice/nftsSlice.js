import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NftsService from './nfts.service';

const initialState = {
  myNfts: [],
  stagingNfts: [],
};

export const getMyNfts = createAsyncThunk(
  'nfts/getMyNfts',
  async (_, { dispatch, getState }) => {
    try {
      const state = getState()
      const res = await NftsService.getNfts(state.user.name)
      dispatch(setMyNfts(res.data.data))
    }
    catch (err) {
      console.log(err)
    }
  }
)

export const getStagingNfts = createAsyncThunk(
  'nfts/getStagingNfts',
  async (_, { dispatch, getState }) => {
    try {
      const state = getState()
      const res = await NftsService.getStagingNfts(state.user.token)
      dispatch(setStagingNfts(res.data.result?.rows))
    }
    catch (err) {
      console.log(err)
    }
  }
)

const nftsSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setMyNfts: (state, action) => {
      state.myNfts = action.payload
    },
    setStagingNfts: (state, action) => {
      state.stagingNfts = action.payload
    },
    clearMyNfts: (state) => {
      state.myNfts = []
    },
  }
});

export const {
  setMyNfts,
  setStagingNfts,
  clearMyNfts
} = nftsSlice.actions;

export default nftsSlice.reducer;
