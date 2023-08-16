import { combineReducers } from 'redux';

import user from './UserReducer';
import nftsSlice from './NftsSlice/nftsSlice';

export const rootReducer = combineReducers({
  user,
  nfts: nftsSlice,
});
