import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import {State} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; //https://ionic.io/ionicons
import {SuraName} from '../models/models';
import {Bookmark} from '../shared/models';
import {setBookmarks} from '../redux/actions/bookmarksActions';

const QuranPageHeader = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const showHeader = useSelector((state: State) => state.header.showHeader);
  const pageInfo = useSelector((state: State) => state.header.pageInfo);
  const bookmarks = useSelector((state: State) => state.bookmark.bookmarks);

  const addPageToBookmark = () => {
    const newBookmark: Bookmark = {
      sura: pageInfo.currentSura,
      juzNumber: pageInfo.currentJuz,
      pageNumber: pageInfo.currentPage,
      date: new Date().toLocaleString(),
    };
    const tempBookmarks = [...bookmarks, newBookmark];
    dispatch(setBookmarks(tempBookmarks));
  };

  return (
    <Animated.View style={{...styles.header, top: showHeader ? 0 : -100}}>
      <Ionicons
        name={'arrow-back'}
        style={styles.backArrow}
        size={24}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.pageInfoContainer}>
        <>
          {pageInfo.currentSura.map((sura: SuraName) => (
            <Text key={sura.bosnian} style={styles.suraInfo}>
              {sura.bosnianTranscription}
            </Text>
          ))}
          <Text>
            Stranica {pageInfo.currentPage}, Dzuz {pageInfo.currentJuz}
          </Text>
        </>
      </View>

      <Ionicons
        name={'bookmark-outline'}
        size={24}
        style={styles.bookmark}
        onPress={addPageToBookmark}
      />
      <Ionicons
        name={'ellipsis-vertical'}
        size={24}
        style={styles.verticalDots}
      />
    </Animated.View>
  );
};

export default QuranPageHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightgray',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    padding: 10,
    height: 55,
  },
  backArrow: {
    width: 24,
  },
  verticalDots: {
    position: 'absolute',
    right: 10,
  },
  bookmark: {position: 'absolute', right: 50},
  pageInfoContainer: {
    position: 'absolute',
    left: 80,
  },
  suraInfo: {
    fontSize: 16,
    fontWeight: '500',
  },
});
