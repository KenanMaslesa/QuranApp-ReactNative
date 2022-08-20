import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import useThemeColor from '../../../style/useTheme';
import {IJuzSuraCard} from '../../../shared/models';
import {SCREENS} from '../../constants';

interface JuzSuraCardProps {
  item: IJuzSuraCard;
}
const JuzSuraCard = ({item}: JuzSuraCardProps) => {
  const navigation = useNavigation();
  const [themeColorStyle] = useThemeColor();

  const goToPage = (page: number) => {
    navigation.navigate(SCREENS.QURAN_SCREEN, {
      startPage: page,
    });
  };
  return (
    <>
      <TouchableHighlight onPress={() => goToPage(item.juz.startPage)}>
        <View style={[styles.juzHeader, themeColorStyle.backgroundTertiary]}>
          <Text style={themeColorStyle.colorPrimary}>
            Dzuz {item.juz.juzNumber}
          </Text>
          <Text style={themeColorStyle.colorPrimary}>{item.juz.startPage}</Text>
        </View>
      </TouchableHighlight>

      {item.surahs.map(sura => (
        <TouchableHighlight
          key={`sura:${sura.index}`}
          onPress={() => goToPage(sura.startPage)}>
          <View
            style={[styles.suraContainer, themeColorStyle.backgroundPrimary]}>
            <Text style={[styles.suraNumber, themeColorStyle.colorPrimary]}>
              {sura.index}
            </Text>
            <View>
              <Text style={[styles.suraName, themeColorStyle.colorPrimary]}>
                {sura?.name.bosnianTranscription}
              </Text>
              <View style={styles.suraInfo}>
                <Text style={themeColorStyle.colorPrimary}>{sura?.type}</Text>
                <Text style={themeColorStyle.colorPrimary}> - </Text>
                <Text style={themeColorStyle.colorPrimary}>
                  {sura?.numberOfAyas} ajeta
                </Text>
              </View>
            </View>
            <Text style={[styles.suraStartPage, themeColorStyle.colorPrimary]}>
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
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suraContainer: {
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
  suraStartPage: {
    position: 'absolute',
    right: 15,
  },
});
