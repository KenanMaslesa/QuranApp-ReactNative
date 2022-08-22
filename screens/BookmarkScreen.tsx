import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getBookmarks, setBookmarks} from '../redux/actions/bookmarksActions';
import {bookmarkActions} from '../redux/slices/bookmarksSlice';
import {State} from '../redux/store';
import {asyncStorageService} from '../services/asyncStorageService';
import {ASYNC_STORAGE_KEYS} from '../shared/AsyncStorageKeys';
import {Bookmark} from '../shared/models';
import useThemeColor from '../style/useTheme';
import {SCREENS} from './constants';

const BookmarkScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [themeColorStyle] = useThemeColor();
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const bookmarks = useSelector((state: State) => state.bookmark.bookmarks);

  useEffect(() => {
    dispatch(getBookmarks());
  }, []);

  const removeAllBookmarsk = () => {
    asyncStorageService.removeData(ASYNC_STORAGE_KEYS.BOOKMARKS);
    dispatch(bookmarkActions.removeAllBookmarks());
  };

  const removeCurrentPageFromBookmarks = (pageNumber: number) => {
    const newBookmarks = bookmarks.filter(
      bookmark => bookmark.pageNumber !== pageNumber,
    );
    dispatch(setBookmarks([...newBookmarks]));
  };

  return (
    <ScrollView style={themeColorStyle.backgroundPrimary}>
      <>
        {bookmarks.map((bookmark: Bookmark) => (
          <TouchableHighlight
            key={bookmark.pageNumber}
            onLongPress={() => setShowDeleteButton(current => !current)}
            onPress={() => {
              if (showDeleteButton) {
                removeCurrentPageFromBookmarks(bookmark.pageNumber);
              } else {
                navigation.navigate(SCREENS.QURAN_SCREEN, {
                  startPage: bookmark.pageNumber,
                });
              }
            }}>
            <View
              style={[styles.bookmarkItem, themeColorStyle.backgroundPrimary]}>
              {showDeleteButton ? (
                <Ionicons
                  style={[styles.bookmarkIcon]}
                  name={'trash'}
                  color={'red'}
                  size={30}
                />
              ) : (
                <Ionicons
                  style={[styles.bookmarkIcon, themeColorStyle.colorTertiary]}
                  name={'bookmark'}
                  size={30}
                />
              )}
              <View>
                <Text style={[styles.suraName, themeColorStyle.colorPrimary]}>
                  {bookmark.sura.bosnianTranscription}
                </Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={[styles.fontSize, themeColorStyle.colorPrimary]}>
                    Stranica {bookmark.pageNumber},{' '}
                  </Text>
                  <Text style={[styles.fontSize, themeColorStyle.colorPrimary]}>
                    Dzuz {bookmark.juzNumber}
                  </Text>
                  <Text style={[styles.fontSize, themeColorStyle.colorPrimary]}>
                    {' '}
                    ◆ {bookmark.date} 🕐
                  </Text>
                </View>
              </View>
              <Text style={[styles.bookmarkPage, themeColorStyle.colorPrimary]}>
                {bookmark.pageNumber}
              </Text>
            </View>
          </TouchableHighlight>
        ))}

        {bookmarks.length > 1 && showDeleteButton && (
          <TouchableOpacity onPress={removeAllBookmarsk}>
            <View style={styles.center}>
              <Ionicons
                style={[styles.bookmarkIcon, themeColorStyle.colorTertiary]}
                name={'trash'}
                size={30}
              />
              <Text style={themeColorStyle.colorPrimary}>REMOVE ALL</Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    </ScrollView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  bookmarkPage: {
    position: 'absolute',
    right: 10,
  },
  bookmarkIcon: {
    padding: 10,
    paddingRight: 15,
  },
  suraName: {
    fontWeight: '600',
    fontSize: 16,
  },
  fontSize: {
    fontSize: 14,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
