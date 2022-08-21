import React from 'react';
import {FlatList, View} from 'react-native';

import {juzToSuraData} from '../../../data/data';
import useThemeColor from '../../../style/useTheme';
import JuzSuraCard from './JuzSuraCard';

const SuraList = () => {
  const [themeColorStyle] = useThemeColor();

  return (
    <View style={themeColorStyle.backgroundPrimary}>
      <FlatList
        data={juzToSuraData}
        keyExtractor={item => `juz:${item.juz.juzNumber}`}
        renderItem={({item}) => <JuzSuraCard item={item} />}
      />
    </View>
  );
};

export default SuraList;
