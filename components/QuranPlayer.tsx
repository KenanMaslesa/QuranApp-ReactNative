import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';

import {quranActions} from '../redux/slices/quranSlice';
import {qariList} from '../data/data';

const PLAYER_ICONS_SIZE = 22;

const QuranPlayer = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.playerContainer}>
      <TouchableOpacity style={styles.playerIcon}>
        <Ionicons name={'stop'} size={PLAYER_ICONS_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playerIcon}>
        <Ionicons name={'play-skip-back'} size={PLAYER_ICONS_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playerIcon}>
        <Ionicons name={'play'} size={PLAYER_ICONS_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playerIcon}>
        <Ionicons name={'play-skip-forward'} size={PLAYER_ICONS_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playerIcon}>
        <Ionicons name={'repeat'} size={PLAYER_ICONS_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playerIcon}>
        <Ionicons name={'settings'} size={PLAYER_ICONS_SIZE} />
      </TouchableOpacity>
      <SelectDropdown
        data={qariList.map(qari => qari.identifier)}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          dispatch(quranActions.setSelectedQari(selectedItem));
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </View>
  );
};

export default QuranPlayer;

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightgray',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
