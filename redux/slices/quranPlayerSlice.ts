import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {qariList} from '../../data/data';
import {Qari} from '../../shared/models';

export interface QuranPlayerSlice {
  playingAyahIndex?: number;
  isPlaying: boolean;
  isStoped: boolean;
  qariList: Qari[];
  selectedQari: Qari;
}

const initialState: QuranPlayerSlice = {
  playingAyahIndex: -1,
  isPlaying: false,
  isStoped: true,
  qariList: qariList,
  selectedQari: {
    value: 'Alafasy_128kbps',
    name: 'Mishary Alafasy',
  },
};

const quranPlayerSlice = createSlice({
  name: 'quranPlayer',
  initialState,
  reducers: {
    setPlayingAyahIndex: (
      state,
      {payload}: PayloadAction<number | undefined>,
    ) => {
      state.playingAyahIndex = payload;
    },
    setSelectedQari: (state, {payload}: PayloadAction<Qari>) => {
      state.selectedQari = payload;
    },
    setIsPlaying: (state, {payload}: PayloadAction<boolean>) => {
      state.isPlaying = payload;
    },
    setIsStoped: (state, {payload}: PayloadAction<boolean>) => {
      state.isStoped = payload;
    },
  },
});

export const quranPlayerReducer = quranPlayerSlice.reducer;
export const quranPlayerActions = quranPlayerSlice.actions;