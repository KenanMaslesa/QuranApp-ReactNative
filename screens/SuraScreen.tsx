import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';
import SuraList from '../components/SuraList';
import {State} from '../redux/store';

const SuraScreen = () => {
  const loading = useSelector((state: State) => state.quran.loading);

  return (
    <View>
      {loading && <Loader />}
      <SuraList />
    </View>
  );
};

export default SuraScreen;
