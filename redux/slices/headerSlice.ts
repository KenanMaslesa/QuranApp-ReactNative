import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SuraName} from '../../models/models';

export interface HeaderSlice {
  showHeader: boolean;
  pageInfo: HeaderPageInfo;
}

export interface HeaderPageInfo {
  currentSura: SuraName[];
  currentPage: number;
  currentJuz: number;
}

const initialState: HeaderSlice = {
  showHeader: false,
  pageInfo: {
    currentSura: [],
    currentPage: 1,
    currentJuz: 1,
  },
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setShowHeader: (state, {payload}: PayloadAction<boolean>) => {
      state.showHeader = payload;
    },
    toggleHeader: state => {
      state.showHeader = !state.showHeader;
    },
    setPageInfo: (state, {payload}: PayloadAction<HeaderPageInfo>) => {
      state.pageInfo = payload;
    },
  },
});

export const headerReducer = headerSlice.reducer;
export const headerActions = headerSlice.actions;
