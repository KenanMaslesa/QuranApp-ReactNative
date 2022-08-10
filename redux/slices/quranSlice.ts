import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface QuranSlice {
  currentPage: number;
  fontSize: number;
  loading: boolean;
  showTranslation: boolean;
}

const initialState: QuranSlice = {
  currentPage: 1,
  fontSize: 25,
  loading: false,
  showTranslation: false,
};

const quranSlice = createSlice({
  name: 'quran',
  initialState,
  reducers: {
    setCurrentPage: (state, {payload}: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setFontSize: (state, {payload}: PayloadAction<number>) => {
      state.fontSize = payload;
    },
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setShowTranslation: (state, {payload}: PayloadAction<boolean>) => {
      state.showTranslation = payload;
    },
  },
});

export const quranReducer = quranSlice.reducer;
export const quranActions = quranSlice.actions;
