import { combineReducers } from 'redux';
import user from './UserReducer';
// import playerSlice from './PlayerSlice/playerSlice';
import nftsSlice from './NftsSlice/nftsSlice';

export const rootReducer = combineReducers({
  user,
  // player: playerSlice,
  nfts: nftsSlice,
});
