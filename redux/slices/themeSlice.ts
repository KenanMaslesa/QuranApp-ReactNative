import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ThemeSlice {
  isDarkTheme: boolean;
}

const initialState: ThemeSlice = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDarkTheme: (state, {payload}: PayloadAction<boolean>) => {
      state.isDarkTheme = payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const themeActions = themeSlice.actions;
