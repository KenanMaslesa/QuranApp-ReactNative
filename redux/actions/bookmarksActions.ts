import {Dispatch} from 'redux';
import {asyncStorageService} from '../../services/asyncStorageService';
import {ASYNC_STORAGE_KEYS} from '../../shared/AsyncStorageKeys';
import {Bookmark, DispatchType} from '../../shared/models';
import {bookmarkActions} from '../slices/bookmarksSlice';

export const getBookmarks = (): any => {
  return async (dispatch: Dispatch<DispatchType<Bookmark[]>>) => {
    asyncStorageService.getData(ASYNC_STORAGE_KEYS.BOOKMARKS).then(
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
    asyncStorageService.storeData(ASYNC_STORAGE_KEYS.BOOKMARKS, bookmarks);
  };
};
