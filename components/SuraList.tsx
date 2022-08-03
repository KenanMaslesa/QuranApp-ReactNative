import React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import {Sura} from '../models/models';
import SuraCard from './SuraCard';
import Loader from './Loader';

const quranMetaData = require('@kmaslesa/quran-metadata');

const SuraList = () => {
  const [suraList, setSuraList] = useState<Sura[]>();

  useEffect(() => {
    const response = quranMetaData.getSuraList();
    setSuraList(response);
  }, []);

  return (
    <View>
      {suraList?.length !== 0 ? (
        <FlatList
          data={suraList}
          keyExtractor={item => `${item.index}`}
          renderItem={({item}) => <SuraCard sura={item} />}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default SuraList;
