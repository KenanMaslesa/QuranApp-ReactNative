import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SettingsSlice {
  isDarkTheme: boolean;
}

const initialState: SettingsSlice = {
  isDarkTheme: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsDarkTheme: (state, {payload}: PayloadAction<boolean>) => {
      state.isDarkTheme = payload;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const settingsActions = settingsSlice.actions;
