import {Dispatch} from 'redux';
import {AsyncStorageService} from '../../services/AsyncStorageService';
import {ASYNC_STORAGE_KEYS} from '../../shared/AsyncStorageKeys';
import {Bookmark, DispatchType} from '../../shared/models';
import {bookmarkActions} from '../slices/bookmarksSlice';

export const getBookmarks = (): any => {
  return async (dispatch: Dispatch<DispatchType<Bookmark[]>>) => {
    AsyncStorageService.getData(ASYNC_STORAGE_KEYS.BOOKMARKS).then(
      (bookmarks: Bookmark[]) => {
        if (bookmarks) {
          dispatch(bookmarkActions.setBookmarks(bookmarks));
        }
      },
    );
  };
};

export const setBookmarks = (bookmarks: Bookmark[]): any => {
  return async (dispatch: Dispatch<DispatchType<Bookmark[]>>) => {
    dispatch(bookmarkActions.setBookmarks(bookmarks));
    AsyncStorageService.storeData(ASYNC_STORAGE_KEYS.BOOKMARKS, bookmarks);
  };
};
