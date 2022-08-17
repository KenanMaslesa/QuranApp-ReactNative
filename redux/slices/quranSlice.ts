import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {qariList} from '../../data/data';

interface Qari {
  identifier: string;
  englishName: string;
}
export interface QuranSlice {
  currentPage: number;
  fontSize: number;
  loading: boolean;
  showTranslation: boolean;
  playingAyahIndex?: number;
  qariList: Qari[];
  selectedQari: string;
}

const initialState: QuranSlice = {
  currentPage: 1,
  fontSize: 25,
  loading: false,
  showTranslation: false,
  playingAyahIndex: -1,
  qariList: qariList,
  selectedQari: 'Alafasy_128kbps',
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
    setPlayingAyahIndex: (
      state,
      {payload}: PayloadAction<number | undefined>,
    ) => {
      state.playingAyahIndex = payload;
    },
    setSelectedQari: (state, {payload}: PayloadAction<string>) => {
      state.selectedQari = payload;
    },
  },
});

export const quranReducer = quranSlice.reducer;
export const quranActions = quranSlice.actions;
