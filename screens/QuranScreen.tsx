import React from 'react';
import {useRef} from 'react';
import {StyleSheet, FlatList, View, ScrollView, Dimensions} from 'react-native';

import QuranPage from '../components/QuranPage';
import {createArray} from '../utils/createArray';

const QuranScreen = ({route}: any) => {
  console.log('QuranScreen');
  const pages = createArray(1, 604);
  const flatListRef = useRef<FlatList>(null);

  // const scrollTo = (pageNumber: number) => {
  //   flatListRef.current?.scrollToIndex({
  //     index: pageNumber - 1,
  //     animated: true,
  //   });
  // };

  const renderItem = ({item}) => (
    <ScrollView key={item}>
      <View style={styles.page}>
        <QuranPage page={item} />
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <FlatList
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
        keyExtractor={item => `${item}`}
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
