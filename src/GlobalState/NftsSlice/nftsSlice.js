import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NftsService from './nfts.service';

const initialState = {
  myNfts: [],
  myWorkingNfts: {},
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

export const getMyWorkingNfts = createAsyncThunk(
  'nfts/getmyWorkingNfts',
  async (id, { dispatch }) => {
    try {
      const res = await NftsService.getWorkingNft(id)
      dispatch(setMyWorkingNfts(res.data.data))
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
    setMyWorkingNfts: (state, action) => {
      const { asset_id } = action.payload;
      state.myWorkingNfts[asset_id] = action.payload;
    },
    clearMyNfts: (state) => {
      state.myNfts = []
      state.myWorkingNfts = {}
    },
  }
});

export const {
  setMyNfts,
  setMyWorkingNfts,
  clearMyNfts
} = nftsSlice.actions;

export default nftsSlice.reducer;
