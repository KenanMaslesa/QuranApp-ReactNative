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
          <Text style={styles.darkColor}>Dzuz {item.juz.juzNumber}</Text>
          <Text style={styles.darkColor}>{item.juz.startPage}</Text>
        </View>
      </TouchableHighlight>

      {item.surahs.map(sura => (
        <TouchableHighlight
          key={`sura:${sura.index}`}
          onPress={() => goToPage(sura.startPage)}>
          <View style={styles.suraContainer}>
            <Text style={{...styles.suraNumber, ...styles.darkColor}}>
              {sura.index}
            </Text>
            <View>
              <Text style={{...styles.suraName, ...styles.darkColor}}>
                {sura?.name.bosnianTranscription}
              </Text>
              <View style={styles.suraInfo}>
                <Text style={styles.darkColor}>{sura?.type}</Text>
                <Text style={styles.darkColor}> - </Text>
                <Text style={styles.darkColor}>{sura?.numberOfAyas} ajeta</Text>
              </View>
            </View>
            <Text style={{...styles.suraStartPage, ...styles.darkColor}}>
              {sura.startPage}
            </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suraContainer: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suraNumber: {
    fontSize: 23,
    paddingRight: 30,
  },
  suraName: {
    fontSize: 16,
    fontWeight: '500',
  },
  suraInfo: {
    flexDirection: 'row',
  },
  darkColor: {
    color: 'black',
  },
  suraStartPage: {
    position: 'absolute',
    right: 15,
  },
});
