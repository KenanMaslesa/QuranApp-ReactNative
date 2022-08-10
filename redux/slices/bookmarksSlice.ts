import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Bookmark} from '../../shared/models';

export interface BookmarkSlice {
  bookmarks: Bookmark[];
}

const initialState: BookmarkSlice = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarks: (state, {payload}: PayloadAction<Bookmark[]>) => {
      state.bookmarks = payload;
    },
    removeAllBookmarks: state => {
      state.bookmarks = [];
    },
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
export const bookmarkActions = bookmarkSlice.actions;
