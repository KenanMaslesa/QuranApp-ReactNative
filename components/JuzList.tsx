import React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import {Juz} from '../models/models';
import Loader from './Loader';
import JuzCard from './JuzCard';

const quranMetaData = require('@kmaslesa/quran-metadata');

const JuzList = () => {
  const [juzList, setJuzList] = useState<Juz[]>();

  useEffect(() => {
    const response = quranMetaData.getJuzList();
    setJuzList(response);
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
