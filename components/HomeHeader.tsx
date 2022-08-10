/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {State} from '../redux/store';
import {SCREENS} from '../screens/constants';
import {randomNumberInRange} from '../utils/randomNumberInRange';

const HomeHeader = () => {
  const navigation = useNavigation();
  const currentPage = useSelector((state: State) => state.quran.currentPage);

  const goToRandomPage = () => {
    const randomNumber = randomNumberInRange(1, 604);
    navigation.navigate(SCREENS.QURAN_SCREEN, {
      startPage: randomNumber,
    });
  };

  const goToLastVisitedPage = () => {
    navigation.navigate(SCREENS.QURAN_SCREEN, {
      startPage: currentPage,
    });
  };
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appName}>Kur'an</Text>

      <TouchableOpacity
        style={styles.bookIcon}
        onPress={() => goToLastVisitedPage()}>
        <Ionicons name={'book-outline'} size={24} />
      </TouchableOpacity>

      <Ionicons name={'search-outline'} size={24} style={styles.searchIcon} />

      <Popover
        mode={PopoverMode.RN_MODAL}
        placement={PopoverPlacement.BOTTOM}
        from={
          <TouchableOpacity style={styles.popoverIcon}>
            <Ionicons name={'ellipsis-vertical'} size={24} />
          </TouchableOpacity>
        }>
        <View style={styles.popoverContainer}>
          <Text style={styles.popoverItem}>Idi na</Text>

          <TouchableOpacity
            style={styles.popoverItem}
            onPress={() => goToRandomPage()}>
            <Text>Random page</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.SETTINGS_SCREEN);
            }}>
            <Text style={styles.popoverItem}>Postavke</Text>
          </TouchableOpacity>

          <Text style={styles.popoverItem}>Pomoc</Text>
          <Text style={styles.popoverItem}>O name</Text>
          <Text style={styles.popoverItem}>Druge aplikacije</Text>
        </View>
      </Popover>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  appName: {fontSize: 20, fontWeight: '500'},
  bookIcon: {
    position: 'absolute',
    right: 100,
    top: '50%',
  },
  searchIcon: {
    position: 'absolute',
    right: 50,
    top: '50%',
  },
  popoverIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  popoverContainer: {
    width: 200,
  },
  popoverItem: {
    padding: 15,
    marginBottom: 5,
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
  },
});
