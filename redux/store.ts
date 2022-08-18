import {configureStore} from '@reduxjs/toolkit';
import {bookmarkReducer} from './slices/bookmarksSlice';
import {headerReducer} from './slices/headerSlice';
import {quranPlayerReducer} from './slices/quranPlayerSlice';
import {quranReducer} from './slices/quranSlice';
import {settingsReducer} from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    bookmark: bookmarkReducer,
    settings: settingsReducer,
    quran: quranReducer,
    quranPlayer: quranPlayerReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
