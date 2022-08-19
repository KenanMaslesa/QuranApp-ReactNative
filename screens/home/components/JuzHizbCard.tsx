import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {JuzToHizbModel} from '../../../shared/models';
import {SCREENS} from '../../constants';

const CIRCLE = {
  SIZE: 45,
  COLOR: 'gray',
};

interface JuzHizbCardProps {
  item: JuzToHizbModel;
}
const JuzHizbCard = ({item}: JuzHizbCardProps) => {
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
      {item.hizbs?.map((hizb, hizbIndex) => (
        <TouchableHighlight key={hizb.page} onPress={() => goToPage(hizb.page)}>
          <View style={styles.hizbContainer}>
            {(hizbIndex === 0 || hizbIndex === 4) && (
              <View style={styles.hizbIconContainer}>
                <MaterialCommunityIcons
                  name="circle-slice-8" //full -> 4/4
                  size={CIRCLE.SIZE}
                  color={CIRCLE.COLOR}
                />
                <Text style={styles.hizbIconText}>{hizb.hizbNumber}</Text>
              </View>
            )}
            {(hizbIndex === 1 || hizbIndex === 5) && (
              <MaterialCommunityIcons
                name="circle-slice-2" // 1/4
                size={CIRCLE.SIZE}
                color={CIRCLE.COLOR}
              />
            )}
            {(hizbIndex === 2 || hizbIndex === 6) && (
              <MaterialCommunityIcons
                name="circle-slice-4" // 2/4
                size={CIRCLE.SIZE}
                color={CIRCLE.COLOR}
              />
            )}
            {(hizbIndex === 3 || hizbIndex === 7) && (
              <MaterialCommunityIcons
                name="circle-slice-6" // 3/4
                size={CIRCLE.SIZE}
                color={CIRCLE.COLOR}
              />
            )}

            <View style={styles.hizbInfoContainer}>
              <Text style={styles.hizbAyah}>{hizb.ayah}</Text>
              <View style={styles.flexDirectionRow}>
                <Text>{hizb.suraName}, </Text>
                <Text>{hizb.ayahNumber} ayah</Text>
              </View>
              <Text style={styles.hizbPage}>{hizb.page}</Text>
            </View>
          </View>
        </TouchableHighlight>
      ))}
    </>
  );
};

export default JuzHizbCard;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  juzHeader: {
    backgroundColor: 'lightgray',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hizbContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  hizbIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hizbIconText: {
    position: 'absolute',
    color: 'white',
  },
  hizbInfoContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
  },
  hizbAyah: {
    fontWeight: '600',
  },
  hizbPage: {
    position: 'absolute',
    right: 10,
  },
  darkColor: {
    color: 'black',
  },
});
