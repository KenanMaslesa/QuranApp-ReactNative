import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface QuranSlice {
  currentPage: number;
  fontSize: number;
  loading: boolean;
  showTranslation: boolean;
  scrollToPage: number;
}

const initialState: QuranSlice = {
  currentPage: 1,
  fontSize: 25,
  loading: false,
  showTranslation: false,
  scrollToPage: -1,
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
    setScrollToPage: (state, {payload}: PayloadAction<number>) => {
      state.scrollToPage = payload;
    },
  },
});

export const quranReducer = quranSlice.reducer;
export const quranActions = quranSlice.actions;
