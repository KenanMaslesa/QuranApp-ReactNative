import React from 'react';
import {FlatList, View} from 'react-native';

import {juzToSuraData} from '../../../data/data';
import JuzSuraCard from './JuzSuraCard';

const SuraList = () => {
  return (
    <View>
      <FlatList
        data={juzToSuraData}
        keyExtractor={item => `juz:${item.juz.juzNumber}`}
        renderItem={({item}) => <JuzSuraCard item={item} />}
      />
    </View>
  );
};

export default SuraList;
