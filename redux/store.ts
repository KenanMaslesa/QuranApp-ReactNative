import {configureStore} from '@reduxjs/toolkit';
import {headerReducer} from './slices/headerSlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
