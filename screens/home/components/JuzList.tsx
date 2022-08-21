import React from 'react';
import {FlatList, View} from 'react-native';

import {juzToHizb} from '../../../data/data';
import useThemeColor from '../../../style/useTheme';
import JuzHizbCard from './JuzHizbCard';

const JuzList = () => {
  const [themeColorStyle] = useThemeColor();
  return (
    <View style={themeColorStyle.backgroundPrimary}>
      <FlatList
        data={juzToHizb}
        renderItem={({item}) => <JuzHizbCard item={item} />}
      />
    </View>
  );
};

export default JuzList;
