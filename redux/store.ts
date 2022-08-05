import {configureStore} from '@reduxjs/toolkit';
import {bookmarkReducer} from './slices/bookmarkSlice';
import {headerReducer} from './slices/headerSlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    bookmark: bookmarkReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
