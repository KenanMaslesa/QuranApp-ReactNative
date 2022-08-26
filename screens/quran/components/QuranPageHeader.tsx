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
import {setBookmarks} from '../../../redux/actions/bookmarksActions';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {State} from '../../../redux/store';
import {Bookmark, SuraName} from '../../../shared/models';
import {quranActions} from '../../../redux/slices/quranSlice';
import {months} from '../../../data/data';
import {setTheme} from '../../../redux/actions/themeActions';
import useThemeColor from '../../../style/useTheme';

const QuranPageHeader = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [themeColorStyle, themeColors] = useThemeColor();

  const {pageInfo, showHeader} = useSelector((state: State) => state.header);
  const bookmarks = useSelector((state: State) => state.bookmark.bookmarks);
  const isDarkTheme = useSelector((state: State) => state.theme.isDarkTheme);
  const {fontSize, showTranslation} = useSelector(
    (state: State) => state.quran,
  );

  const headerStyle = {
    top: showHeader ? 0 : -100,
  };

  const toggleBookmark = () => {
    const alreadyExist: boolean = bookmarks.some(
      (bookmark: Bookmark) => bookmark.pageNumber === pageInfo.currentPage,
    );
    if (alreadyExist) {
      removeCurrentPageFromBookmarks();
      return;
    }
    addCurrentPageToBookmarks();
  };

  const removeCurrentPageFromBookmarks = () => {
    const newBookmarks = bookmarks.filter(
      bookmark => bookmark.pageNumber !== pageInfo.currentPage,
    );
    dispatch(setBookmarks([...newBookmarks]));
  };

  const addCurrentPageToBookmarks = () => {
    const date = new Date();
    const newBookmark: Bookmark = {
      sura: pageInfo.currentSura[0],
      juzNumber: pageInfo.currentJuz,
      pageNumber: pageInfo.currentPage,
      date: `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`,
    };
    const tempBookmarks = [...bookmarks, newBookmark];
    dispatch(setBookmarks(tempBookmarks));
  };

  const isPageInBookmarks = (): boolean => {
    return bookmarks.some(
      bookmark => bookmark.pageNumber === pageInfo.currentPage,
    );
  };

  return (
    <Animated.View
      style={[styles.header, themeColorStyle.backgroundTertiary, headerStyle]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons
          name={'arrow-back'}
          style={[styles.backArrow, themeColorStyle.colorPrimary]}
          size={24}
        />
      </TouchableOpacity>

      <View style={styles.pageInfoContainer}>
        <>
          <View style={styles.suraInfoContainer}>
            {pageInfo.currentSura.map((sura: SuraName, suraIndex: number) => (
              <Text
                key={sura.bosnian}
                style={[styles.suraInfo, themeColorStyle.colorPrimary]}>
                {sura.bosnianTranscription}
                {suraIndex < pageInfo.currentSura.length - 1 && <Text>, </Text>}
              </Text>
            ))}
          </View>
          <Text style={themeColorStyle.colorPrimary}>
            Stranica {pageInfo.currentPage}, Dzuz {pageInfo.currentJuz}
          </Text>
        </>
      </View>

      <TouchableOpacity
        style={styles.bookmark}
        onPress={() => toggleBookmark()}>
        <Ionicons
          name={isPageInBookmarks() ? 'bookmark' : 'bookmark-outline'}
          style={themeColorStyle.colorPrimary}
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
            <Ionicons
              name={'ellipsis-vertical'}
              style={themeColorStyle.colorPrimary}
              size={24}
            />
          </TouchableOpacity>
        }>
        <View
          style={[styles.popoverContainer, themeColorStyle.backgroundPrimary]}>
          <BouncyCheckbox
            size={25}
            style={styles.popoverItem}
            isChecked={showTranslation}
            fillColor={themeColors.backgroundSecondary}
            unfillColor={themeColors.colorPrimary}
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
            <Text style={themeColorStyle.colorPrimary}>Font size:</Text>
            <Pressable
              style={[
                styles.fontSizeButton,
                themeColorStyle.backgroundSecondary,
              ]}
              onPress={() => dispatch(quranActions.setFontSize(fontSize - 1))}>
              <Text
                style={[
                  styles.fontSizeButtonText,
                  themeColorStyle.colorPrimary,
                ]}>
                -
              </Text>
            </Pressable>

            <Text style={[styles.quranFontSize, themeColorStyle.colorPrimary]}>
              {fontSize}
            </Text>

            <Pressable
              style={[
                styles.fontSizeButton,
                themeColorStyle.backgroundSecondary,
              ]}
              onPress={() => dispatch(quranActions.setFontSize(fontSize + 1))}>
              <Text
                style={[
                  styles.fontSizeButtonText,
                  themeColorStyle.colorPrimary,
                ]}>
                +
              </Text>
            </Pressable>
          </View>
        </View>
      </Popover>
    </Animated.View>
  );
};

export default QuranPageHeader;

const styles = StyleSheet.create({
  header: {
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
  bookmark: {
    position: 'absolute',
    right: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 5,
    margin: 10,
  },
  fontSizeButtonText: {
    fontSize: 16,
  },
  quranFontSize: {
    fontSize: 16,
  },
});
