import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {qariList} from '../../data/data';
import {Qari} from '../../shared/models';

export const REPEAT_OPTIONS = {
  NO_REPEAT: 0,
  INFINITY: 4,
};
export interface QuranPlayerSlice {
  playingAyahIndex?: number;
  isPlaying: boolean;
  isStoped: boolean;
  qariList: Qari[];
  selectedQari: Qari;
  repeatNumber: number;
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
  repeatNumber: REPEAT_OPTIONS.NO_REPEAT,
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
    toggleRepeatNumber: state => {
      state.repeatNumber = state.repeatNumber + 1;
      if (state.repeatNumber === REPEAT_OPTIONS.INFINITY) {
        state.repeatNumber = REPEAT_OPTIONS.INFINITY;
      } else if (state.repeatNumber >= REPEAT_OPTIONS.INFINITY) {
        state.repeatNumber = REPEAT_OPTIONS.NO_REPEAT;
      }
    },
  },
});

export const quranPlayerReducer = quranPlayerSlice.reducer;
export const quranPlayerActions = quranPlayerSlice.actions;
