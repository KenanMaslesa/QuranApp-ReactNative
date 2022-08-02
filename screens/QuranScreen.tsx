import React from 'react';

import {useEffect, useRef} from 'react';
import {StyleSheet, FlatList, View, ScrollView, Dimensions} from 'react-native';

import QuranPage from '../components/QuranPage';
import {createArray} from '../utils/createArray';

const QuranScreen = () => {
  const pages = createArray(1, 604);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    scrollTo(604);
  }, []);

  const scrollTo = (pageNumber: number) => {
    flatListRef.current?.scrollToIndex({
      index: pageNumber - 1,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
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
        keyExtractor={page => page.toString()}
        renderItem={({item}) => (
          <ScrollView>
            <View style={styles.page}>
              <QuranPage key={item} page={item} />
            </View>
          </ScrollView>
        )}
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
