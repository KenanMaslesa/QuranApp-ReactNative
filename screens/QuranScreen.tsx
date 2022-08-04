import React from 'react';
import {useRef} from 'react';
import {StyleSheet, FlatList, View, ScrollView, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';

import QuranPage from '../components/QuranPage';
import {PageInfo} from '../models/models';
import {headerActions} from '../redux/slices/headerSlice';
import {QuranService} from '../services/QuranService';
import {createArray} from '../utils/createArray';

export interface FlatListViewableItem {
  index: number;
  isViewable: boolean;
  item: number;
  pageId: number;
  key: string;
}

const QuranScreen = ({route}: any) => {
  console.log('QuranScreen');
  const dispatch = useDispatch();

  const pages = createArray(1, 604);
  const flatListRef = useRef<FlatList>(null);

  // const scrollTo = (pageNumber: number) => {
  //   flatListRef.current?.scrollToIndex({
  //     index: pageNumber - 1,
  //     animated: true,
  //   });
  // };

  const renderItem = ({item}: any) => (
    <ScrollView>
      <View style={styles.page}>
        <QuranPage page={item} />
      </View>
    </ScrollView>
  );

  const onViewableItemsChanged = React.useRef(({viewableItems, changed}) => {
    const visibleItems: FlatListViewableItem[] = viewableItems;
    if (visibleItems.length !== 0) {
      getPageInfoAndSetHeaderInfo(visibleItems[visibleItems.length - 1].item);
    }
  });

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 70, //70 means that item is considered visible if it is visible for more than 70 percents.
  };

  const getPageInfoAndSetHeaderInfo = (pageNumber: number) => {
    const pageInfo = QuranService.getPageInfo(pageNumber) as PageInfo;
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
    </View>
  );
};

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.2,
    height: height - 55,
    width,
  },
});

export default QuranScreen;
