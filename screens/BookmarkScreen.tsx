import React, {useEffect} from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getBookmarks} from '../redux/actions/bookmarksActions';
import {bookmarkActions} from '../redux/slices/bookmarksSlice';
import {State} from '../redux/store';
import {asyncStorageService} from '../services/asyncStorageService';
import {ASYNC_STORAGE_KEYS} from '../shared/AsyncStorageKeys';
import {Bookmark} from '../shared/models';
import {SCREENS} from './constants';

const BookmarkScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: State) => state.bookmark.bookmarks);

  const removeAllBookmarsk = () => {
    asyncStorageService.removeData(ASYNC_STORAGE_KEYS.BOOKMARKS);
    dispatch(bookmarkActions.removeAllBookmarks());
  };

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <ScrollView>
      <>
        {bookmarks.map((bookmark: Bookmark) => (
          <TouchableHighlight
            style={styles.bookmarkItemContainer}
            key={bookmark.pageNumber}
            onPress={() => {
              navigation.navigate(SCREENS.QURAN_SCREEN, {
                startPage: bookmark.pageNumber,
              });
            }}>
            <View style={styles.bookmarkItem}>
              <Ionicons
                style={styles.bookmarkIcon}
                name={'bookmark'}
                size={30}
              />
              <View>
                <Text style={styles.suraName}>
                  {bookmark.sura.bosnianTranscription}
                </Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.fontSize}>
                    Stranica {bookmark.pageNumber},{' '}
                  </Text>
                  <Text style={styles.fontSize}>Dzuz {bookmark.juzNumber}</Text>
                  <Text style={styles.fontSize}> ◆ {bookmark.date} 🕐</Text>
                </View>
              </View>
              <Text style={styles.bookmarkPage}>{bookmark.pageNumber}</Text>
            </View>
          </TouchableHighlight>
        ))}

        {bookmarks.length > 1 && (
          <View style={styles.center}>
            <TouchableOpacity onPress={removeAllBookmarsk}>
              <Ionicons style={styles.bookmarkIcon} name={'trash'} size={30} />
            </TouchableOpacity>
          </View>
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
  bookmarkItemContainer: {
    backgroundColor: 'lightgray',
    marginBottom: 20,
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
    paddingRight: 10,
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
