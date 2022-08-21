import React, {useEffect} from 'react';
import {useRef} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import QuranPage from './components/QuranPage';
import QuranPlayer from './components/QuranPlayer';
import QuranTranslationBottomSheet from './components/QuranTranslationBottomSheet';
import {headerActions} from '../../redux/slices/headerSlice';
import {quranActions} from '../../redux/slices/quranSlice';
import {State} from '../../redux/store';
import {quranService} from '../../services/quranService';
import {PageInfo} from '../../shared/models';
import {createArray} from '../../utils/createArray';
import useThemeColor from '../../style/useTheme';
import {systemNavigationBarService} from '../../services/systemNavigationBarService';

interface FlatListViewableItem {
  index: number;
  isViewable: boolean;
  item: number;
  pageId: number;
  key: string;
}

const QuranScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const [themeColorStyle, themeColors] = useThemeColor();

  const {currentPage, showTranslation, scrollToPage} = useSelector(
    (state: State) => state.quran,
  );
  const {showHeader} = useSelector((state: State) => state.header);

  const pages = createArray(1, 604);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    dispatch(headerActions.setShowHeader(true));
    setTimeout(() => {
      dispatch(headerActions.setShowHeader(false));
      systemNavigationBarService.stickyImmersive();
    }, 2000);
  }, []);

  useEffect(() => {
    if (scrollToPage >= 0) {
      scrollTo(scrollToPage);
    }
  }, [scrollToPage]);

  const scrollTo = (pageNumber: number) => {
    flatListRef.current?.scrollToIndex({
      index: pageNumber - 1,
      animated: true,
    });
  };

  const renderItem = ({item}: any) => (
    <ScrollView>
      <View style={[styles.page, themeColorStyle.backgroundPrimary]}>
        <QuranPage page={item} />
      </View>
    </ScrollView>
  );

  const onViewableItemsChanged = React.useRef(({viewableItems}: any) => {
    const visibleItems: FlatListViewableItem[] = viewableItems;
    if (visibleItems.length !== 0) {
      const currentSlide = visibleItems[visibleItems.length - 1].item;
      dispatch(quranActions.setCurrentPage(currentSlide));
      getPageInfoAndSetHeaderInfo(currentSlide);
    }
  });

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 70, //70 means that item is considered visible if it is visible for more than 70 percents.
  };

  const getPageInfoAndSetHeaderInfo = (pageNumber: number) => {
    const pageInfo = quranService.getPageInfo(pageNumber) as PageInfo;
    dispatch(
      headerActions.setPageInfo({
        currentJuz: pageInfo.juz,
        currentSura: pageInfo.sura,
        currentPage: pageNumber,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        viewabilityConfig={_viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        initialScrollIndex={route.params.startPage - 1}
        ref={flatListRef}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        windowSize={5} // https://reactnative.dev/docs/optimizing-flatlist-configuration#windowsize
        data={pages}
        inverted
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        keyExtractor={item => `pageId:${item}`}
        renderItem={renderItem}
      />
      {showTranslation && (
        <QuranTranslationBottomSheet pageNumber={currentPage} />
      )}
      {showHeader && <QuranPlayer />}
    </View>
  );
};

const {width, height} = Dimensions.get('screen');
const statusBarHight =
  StatusBar.currentHeight !== undefined ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.2,
    height: height - statusBarHight,
    width,
  },
});

export default QuranScreen;
