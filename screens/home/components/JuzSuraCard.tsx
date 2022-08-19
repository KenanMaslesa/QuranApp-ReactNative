import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {IJuzSuraCard} from '../../../shared/models';
import {SCREENS} from '../../constants';

interface JuzSuraCardProps {
  item: IJuzSuraCard;
}
const JuzSuraCard = ({item}: JuzSuraCardProps) => {
  const navigation = useNavigation();

  const goToPage = (page: number) => {
    navigation.navigate(SCREENS.QURAN_SCREEN, {
      startPage: page,
    });
  };
  return (
    <>
      <TouchableHighlight onPress={() => goToPage(item.juz.startPage)}>
        <View style={styles.juzHeader}>
          <Text>Dzuz {item.juz.juzNumber}</Text>
          <Text style={styles.juzStartPage}>{item.juz.startPage}</Text>
        </View>
      </TouchableHighlight>

      {item.surahs.map(sura => (
        <TouchableHighlight
          key={`sura:${sura.index}`}
          onPress={() => goToPage(sura.startPage)}>
          <View style={styles.suraContainer}>
            <Text style={styles.suraNumber}>{sura.index}</Text>
            <View>
              <Text style={styles.suraName}>
                {sura?.name.bosnianTranscription}
              </Text>
              <View style={styles.suraInfo}>
                <Text style={styles.colorWhite}>{sura?.type}</Text>
                <Text style={styles.colorWhite}> - </Text>
                <Text style={styles.colorWhite}>
                  {sura?.numberOfAyas} ajeta
                </Text>
              </View>
            </View>
            <Text style={styles.suraStartPage}>{sura.startPage}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </>
  );
};

export default JuzSuraCard;

const styles = StyleSheet.create({
  juzHeader: {
    backgroundColor: 'lightgray',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  juzStartPage: {
    position: 'absolute',
    right: 10,
    color: 'gray',
  },
  suraContainer: {
    backgroundColor: 'gray',
    padding: 15,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suraNumber: {
    color: 'white',
    fontSize: 23,
    paddingRight: 30,
  },
  suraName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  suraInfo: {
    flexDirection: 'row',
  },
  colorWhite: {
    color: 'white',
  },
  suraStartPage: {
    position: 'absolute',
    right: 10,
    color: 'white',
  },
});
