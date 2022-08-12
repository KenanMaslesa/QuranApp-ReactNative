import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREENS} from '../screens/constants';
import {Sura} from '../shared/models';
import {useDispatch} from 'react-redux';

import {quranActions} from '../redux/slices/quranSlice';
import chapterBg from '../assets/images/chapter-number-blue.png';

interface SuraCardProps {
  sura: Sura;
}
const SuraCard = ({sura}: SuraCardProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const viewSura = () => {
    dispatch(quranActions.setLoading(true));
    setTimeout(() => {
      navigation.navigate(SCREENS.QURAN_SCREEN, {
        startPage: sura.startPage,
      });
    }, 1);
  };

  return (
    <>
      <TouchableOpacity style={styles.listItem} onPress={viewSura}>
        <ImageBackground
          source={chapterBg}
          resizeMode="cover"
          style={styles.chapterNumber}>
          <Text style={styles.chapterNumberText}>{sura.index}</Text>
        </ImageBackground>
        <View style={{flexGrow: 1}}>
          <Text style={styles.name}>{sura.name.bosnianTranscription}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.class}>{'MEDINAN'}</Text>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.versesNumber}>
              {sura.numberOfAyas + ' VERSES'}
            </Text>
          </View>
        </View>
        <Text style={styles.nameAr}>{sura.name.arabic}</Text>
      </TouchableOpacity>
    </>
  );
};

export default SuraCard;

const styles = StyleSheet.create({
  suraContainer: {
    flex: 1,
    alignItems: 'center',
  },
  suraCard: {
    padding: 15,
    borderColor: 'gray',
    borderBottomWidth: 0.2,
    width: '95%',
    borderRadius: 5,
    backgroundColor: '#f4f5f6',
    marginBottom: 10,
  },
  suraText: {
    color: 'black',
    fontSize: 16,
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterNumber: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chapterNumberText: {
    fontWeight: 'bold',
    color: '#15803D',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#484b48',
  },
  nameAr: {
    fontSize: 20,
    marginTop: -10,
    fontFamily: 'AlQalamQuran',
    color: '#484b48',
  },
  bullet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AFFF',
    paddingHorizontal: 5,
  },
  class: {
    fontSize: 12,
    color: '#9CA3AFFF',
  },
  versesNumber: {
    fontSize: 12,
    color: '#9CA3AFFF',
  },
});
