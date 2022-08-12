import React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import SuraCard from './SuraCard';
import Loader from './Loader';
import {Sura} from '../shared/models';
import {quranService} from '../services/quranService';

const SuraList = () => {
  const [suraList, setSuraList] = useState<Sura[]>();

  useEffect(() => {
    setSuraList(quranService.getSuraList());
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
