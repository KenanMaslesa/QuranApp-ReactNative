import React, {useEffect} from 'react';
import {useRef} from 'react';
import {StyleSheet, FlatList, View, ScrollView, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import QuranPage from '../components/QuranPage';
import QuranTranslationBottomSheet from '../components/QuranTranslationBottomSheet';
import {headerActions} from '../redux/slices/headerSlice';
import {quranActions} from '../redux/slices/quranSlice';
import {State} from '../redux/store';
import {quranService} from '../services/quranService';
import {PageInfo} from '../shared/models';
import {createArray} from '../utils/createArray';

interface FlatListViewableItem {
  index: number;
  isViewable: boolean;
  item: number;
  pageId: number;
  key: string;
}

const QuranScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state: State) => state.settings.isDarkTheme);
  const currentPage = useSelector((state: State) => state.quran.currentPage);
  const showTranslation = useSelector(
    (state: State) => state.quran.showTranslation,
  );

  const pages = createArray(1, 604);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    dispatch(quranActions.setLoading(false));
    dispatch(headerActions.setShowHeader(true));
    setTimeout(() => {
      dispatch(headerActions.setShowHeader(false));
    }, 3000);
  }, []);

  // const scrollTo = (pageNumber: number) => {
  //   flatListRef.current?.scrollToIndex({
  //     index: pageNumber - 1,
  //     animated: true,
  //   });
  // };

  const renderItem = ({item}: any) => (
    <ScrollView>
      <View style={styles.page(isDarkTheme)}>
        <QuranPage page={item} isDarkTheme={isDarkTheme} />
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
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={5} //https://reactnative.dev/docs/optimizing-flatlist-configuration
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
    </View>
  );
};

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
    flex: 1,
  },
  page: (isDarkTheme: boolean) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.2,
    height: height - 55,
    width,
    backgroundColor: isDarkTheme ? 'black' : 'white',
  }),
});

export default QuranScreen;
