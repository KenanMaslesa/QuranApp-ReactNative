import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {Sura} from '../models/models';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SuraCard: React.FC<{sura: Sura}> = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.suraContainer}
      onPress={() => {
        navigation.navigate('Quran', {
          startPage: props.sura.startPage,
        });
      }}>
      <View style={styles.suraCard}>
        <Text style={styles.suraText}>
          {props.sura.index}. {props.sura.name.bosnianTranscription} -{' '}
          {props.sura.name.bosnian}
        </Text>
        {/* <Text>
          {props.sura.type} - {props.sura.numberOfAyas} ayahs
        </Text> */}
      </View>
    </TouchableOpacity>
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
});
