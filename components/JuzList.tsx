import React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import Loader from './Loader';
import JuzCard from './JuzCard';
import {Juz} from '../shared/models';
import {quranService} from '../services/quranService';

const JuzList = () => {
  const [juzList, setJuzList] = useState<Juz[]>();

  useEffect(() => {
    setJuzList(quranService.getJuzList());
  }, []);

  return (
    <View>
      {juzList?.length !== 0 ? (
        <FlatList
          data={juzList}
          renderItem={({item}) => <JuzCard juz={item} />}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default JuzList;
