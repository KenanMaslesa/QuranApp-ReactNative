import React, {useEffect} from 'react';
import {Button, Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getBookmarks} from '../redux/actions/bookmarksActions';
import {bookmarkActions} from '../redux/slices/bookmarksSlice';
import {State} from '../redux/store';
import {AsyncStorageService} from '../services/AsyncStorageService';
import {ASYNC_STORAGE_KEYS} from '../shared/AsyncStorageKeys';
import {Bookmark} from '../shared/models';
import {SCREENS} from './constants';

const BookmarkScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: State) => state.bookmark.bookmarks);

  const removeAllBookmarsk = () => {
    AsyncStorageService.removeData(ASYNC_STORAGE_KEYS.BOOKMARKS);
    dispatch(bookmarkActions.removeAllBookmarks());
  };

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <ScrollView>
      <>
        <Button title="remove all" onPress={removeAllBookmarsk} />
        {bookmarks.map((bookmark: Bookmark) => (
          <Pressable
            style={styles.bookmarkItem}
            key={bookmark.pageNumber}
            onPress={() => {
              navigation.navigate(SCREENS.QURAN_SCREEN, {
                startPage: bookmark.pageNumber,
              });
            }}>
            <Text>Dzuz {bookmark.juzNumber}</Text>
            <Text>Page {bookmark.pageNumber}</Text>
            <Text>Date {bookmark.date}</Text>
          </Pressable>
        ))}
      </>
    </ScrollView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  bookmarkItem: {
    backgroundColor: 'lightgray',
    marginBottom: 20,
  },
});
