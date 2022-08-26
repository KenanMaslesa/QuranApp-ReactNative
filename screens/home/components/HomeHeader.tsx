import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {State} from '../../../redux/store';
import {SCREENS} from '../../constants';
import {randomNumberInRange} from '../../../utils/randomNumberInRange';
import useThemeColor from '../../../style/useTheme';
import {ToggleTheme} from '../../../style/ToggleTheme';

const HomeHeader = () => {
  const navigation = useNavigation();
  const currentPage = useSelector((state: State) => state.quran.currentPage);
  const [themeColorStyle] = useThemeColor();

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
    <View style={[styles.headerContainer, themeColorStyle.backgroundPrimary]}>
      <Text style={[styles.appName, themeColorStyle.colorPrimary]}>Kur'an</Text>
      <View style={styles.iconsContainer}>
        <View style={styles.icon}>
          <ToggleTheme />
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => goToLastVisitedPage()}>
          <Ionicons
            name={'book-outline'}
            size={24}
            style={themeColorStyle.colorPrimary}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => {}} style={styles.icon}>
          <Ionicons
            name={'search-outline'}
            size={24}
            style={themeColorStyle.colorPrimary}
          />
        </TouchableOpacity> */}
        <Popover
          mode={PopoverMode.RN_MODAL}
          placement={PopoverPlacement.BOTTOM}
          from={
            <TouchableOpacity style={styles.icon}>
              <Ionicons
                name={'ellipsis-vertical'}
                size={24}
                style={themeColorStyle.colorPrimary}
              />
            </TouchableOpacity>
          }>
          <View
            style={[
              styles.popoverContainer,
              themeColorStyle.backgroundPrimary,
            ]}>
            <Text style={[styles.popoverItem, themeColorStyle.colorPrimary]}>
              Idi na
            </Text>

            <TouchableOpacity
              style={styles.popoverItem}
              onPress={() => goToRandomPage()}>
              <Text style={themeColorStyle.colorPrimary}>Random page</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(SCREENS.SETTINGS_SCREEN);
              }}>
              <Text style={[styles.popoverItem, themeColorStyle.colorPrimary]}>
                Postavke
              </Text>
            </TouchableOpacity>

            <Text style={[styles.popoverItem, themeColorStyle.colorPrimary]}>
              Pomoc
            </Text>
            <Text style={[styles.popoverItem, themeColorStyle.colorPrimary]}>
              O name
            </Text>
            <Text style={[styles.popoverItem, themeColorStyle.colorPrimary]}>
              Druge aplikacije
            </Text>
          </View>
        </Popover>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
  },
  appName: {fontSize: 20, fontWeight: '500'},
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 5,
  },
  icon: {
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
