import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Juz} from '../shared/models';
import {SCREENS} from '../screens/constants';

const JuzCard: React.FC<{juz: Juz}> = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.suraContainer}
      onPress={() => {
        navigation.navigate(SCREENS.QURAN_SCREEN, {
          startPage: props.juz.startPage,
        });
      }}>
      <View style={styles.suraCard}>
        <Text style={styles.suraText}>{props.juz.id}. Džuz</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JuzCard;

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
