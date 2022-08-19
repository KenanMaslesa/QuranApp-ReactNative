import React from 'react';
import {FlatList, View} from 'react-native';

import {juzToHizb} from '../../../data/data';
import JuzHizbCard from './JuzHizbCard';

const JuzList = () => {
  return (
    <View>
      <FlatList
        data={juzToHizb}
        renderItem={({item}) => <JuzHizbCard item={item} />}
      />
    </View>
  );
};

export default JuzList;
