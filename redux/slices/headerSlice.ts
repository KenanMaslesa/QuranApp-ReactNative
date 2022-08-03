import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  showHeader: false,
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
  },
});

export const headerReducer = headerSlice.reducer;
export const headerActions = headerSlice.actions;
