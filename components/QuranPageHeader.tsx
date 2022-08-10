import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; //https://ionic.io/ionicons
import {setBookmarks} from '../redux/actions/bookmarksActions';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {State} from '../redux/store';
import {Bookmark, SuraName} from '../shared/models';
import {settingsActions} from '../redux/slices/settingsSlice';
import {quranActions} from '../redux/slices/quranSlice';

const QuranPageHeader = () => {
  console.log('QuranPageHeader');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {pageInfo, showHeader} = useSelector((state: State) => state.header);
  const bookmarks = useSelector((state: State) => state.bookmark.bookmarks);
  const isDarkTheme = useSelector((state: State) => state.settings.isDarkTheme);
  const {fontSize, showTranslation} = useSelector(
    (state: State) => state.quran,
  );

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

  const isPageInBookmarks = (): boolean => {
    return bookmarks.some(
      bookmark => bookmark.pageNumber === pageInfo.currentPage,
    );
  };

  const styles = StyleSheet.create({
    header: {
      backgroundColor: isDarkTheme ? 'black' : 'lightgray',
      position: 'absolute',
      left: 0,
      right: 0,
      justifyContent: 'center',
      padding: 10,
      height: 55,
      top: showHeader ? 0 : -100,
    },
    backArrow: {
      width: 24,
      color: isDarkTheme ? 'white' : 'black',
    },
    verticalDots: {
      position: 'absolute',
      right: 10,
      color: isDarkTheme ? 'white' : 'black',
    },
    bookmark: {
      position: 'absolute',
      right: 50,
      color: isDarkTheme ? 'white' : 'black',
    },
    pageInfoContainer: {
      position: 'absolute',
      left: 80,
    },
    suraInfoContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    suraInfo: {
      fontSize: 16,
      fontWeight: '500',
      color: isDarkTheme ? 'white' : 'black',
    },
    juzInfo: {
      color: isDarkTheme ? 'white' : 'black',
    },
    popoverContainer: {
      width: 200,
    },
    popoverItem: {
      padding: 20,
    },
    fontSizeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: 'gray',
    },
    fontSizeButton: {
      width: 30,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      padding: 5,
      margin: 10,
    },
    fontSizeButtonText: {
      color: 'white',
      fontSize: 16,
    },
    quranFontSize: {
      fontSize: 16,
    },
  });

  return (
    <Animated.View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name={'arrow-back'} style={styles.backArrow} size={24} />
      </TouchableOpacity>

      <View style={styles.pageInfoContainer}>
        <>
          <View style={styles.suraInfoContainer}>
            {pageInfo.currentSura.map((sura: SuraName, suraIndex: number) => (
              <Text key={sura.bosnian} style={styles.suraInfo}>
                {sura.bosnianTranscription}
                {suraIndex < pageInfo.currentSura.length - 1 && <Text>, </Text>}
              </Text>
            ))}
          </View>
          <Text style={styles.juzInfo}>
            Stranica {pageInfo.currentPage}, Dzuz {pageInfo.currentJuz}
          </Text>
        </>
      </View>

      <TouchableOpacity style={styles.bookmark} onPress={addPageToBookmark}>
        <Ionicons
          name={isPageInBookmarks() ? 'bookmark' : 'bookmark-outline'}
          size={24}
        />
      </TouchableOpacity>

      <Popover
        mode={PopoverMode.RN_MODAL}
        placement={PopoverPlacement.BOTTOM}
        offset={10}
        arrowSize={{width: 0, height: 0}}
        from={
          <TouchableOpacity style={styles.verticalDots}>
            <Ionicons name={'ellipsis-vertical'} size={24} />
          </TouchableOpacity>
        }>
        <View style={styles.popoverContainer}>
          <BouncyCheckbox
            size={25}
            style={styles.popoverItem}
            isChecked={isDarkTheme}
            fillColor="blue"
            unfillColor="#FFFFFF"
            // eslint-disable-next-line react-native/no-inline-styles
            textStyle={{
              textDecorationLine: 'none',
            }}
            text="Dark mode"
            onPress={(isChecked: boolean) => {
              dispatch(settingsActions.setIsDarkTheme(isChecked));
            }}
          />

          <BouncyCheckbox
            size={25}
            style={styles.popoverItem}
            isChecked={showTranslation}
            fillColor="blue"
            unfillColor="#FFFFFF"
            // eslint-disable-next-line react-native/no-inline-styles
            textStyle={{
              textDecorationLine: 'none',
            }}
            text="Show translation"
            onPress={(isChecked: boolean) => {
              dispatch(quranActions.setShowTranslation(isChecked));
            }}
          />

          <View style={styles.fontSizeContainer}>
            <Text>Font size:</Text>
            <Pressable
              style={styles.fontSizeButton}
              onPress={() => dispatch(quranActions.setFontSize(fontSize - 1))}>
              <Text style={styles.fontSizeButtonText}>-</Text>
            </Pressable>

            <Text style={styles.quranFontSize}>{fontSize}</Text>

            <Pressable
              style={styles.fontSizeButton}
              onPress={() => dispatch(quranActions.setFontSize(fontSize + 1))}>
              <Text style={styles.fontSizeButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
      </Popover>
    </Animated.View>
  );
};

export default QuranPageHeader;
