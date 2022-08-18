import React, {useEffect} from 'react';

import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import SelectDropdownWithSearch from 'react-native-select-dropdown-with-search';
const {width, height} = Dimensions.get('screen');

import {qariList} from '../../../data/data';
import SoundPlayer from 'react-native-sound-player';
import {State} from '../../../redux/store';
import useQuranPlayer from '../../../hooks/useQuranPlayer';
import {quranPlayerActions} from '../../../redux/slices/quranPlayerSlice';
import {Qari} from '../../../shared/models';
import {
  getSelectedQari,
  setSelectedQari,
} from '../../../redux/actions/quranPlayerActions';

const PLAYER_ICONS_SIZE = 25;
interface SelectDropdownItem {
  name: string;
  value: string;
}
const QuranPlayer = () => {
  const dispatch = useDispatch();
  const {isPlaying, isStoped, selectedQari, playingAyahIndex} = useSelector(
    (state: State) => state.quranPlayer,
  );
  const [playAyahAudio, resetPlayingAyahAndWord] = useQuranPlayer();

  useEffect(() => {
    dispatch(getSelectedQari());
  }, []);

  const stopPlaying = () => {
    SoundPlayer.stop();
    dispatch(quranPlayerActions.setIsPlaying(false));
    dispatch(quranPlayerActions.setIsStoped(true));
    resetPlayingAyahAndWord();
  };

  const pausePlaying = () => {
    SoundPlayer.pause();
    dispatch(quranPlayerActions.setIsPlaying(false));
  };

  const resumePlaying = () => {
    SoundPlayer.resume();
    dispatch(quranPlayerActions.setIsPlaying(true));
  };

  const playNextAyah = () => {
    dispatch(quranPlayerActions.setIsPlaying(true));
    playAyahAudio(playingAyahIndex + 1);
    dispatch(quranPlayerActions.setPlayingAyahIndex(playingAyahIndex + 1));
  };

  const playPreviousAyah = () => {
    dispatch(quranPlayerActions.setIsPlaying(true));
    playAyahAudio(playingAyahIndex - 1);
    dispatch(quranPlayerActions.setPlayingAyahIndex(playingAyahIndex - 1));
  };

  return (
    <View style={styles.playerContainer}>
      {isStoped ? (
        <View>
          <SelectDropdownWithSearch
            data={qariList}
            onSelect={(selectedItem: Qari, index) => {
              console.log(selectedItem, index);
              dispatch(setSelectedQari(selectedItem));
            }}
            defaultButtonText={'Search...'}
            defaultValueByIndex={qariList.findIndex(
              (qari: Qari) => qari.value === selectedQari.value,
            )}
            buttonTextAfterSelection={(selectedItem: SelectDropdownItem) => {
              // text represented after item is selected
              return selectedItem.name;
            }}
            rowTextForSelection={(item: SelectDropdownItem, index) => {
              // text represented for each item in dropdown
              return `${index + 1}. ${item.name}`;
            }}
            buttonStyle={styles.dropdownButtonStyle}
            dropdownStyle={styles.dropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownTextStyle}
            dropdownOverlayColor={'#0008'}
          />
        </View>
      ) : (
        <View style={styles.playerIconsContainer}>
          <TouchableOpacity
            style={styles.playerIcon}
            onPress={() => stopPlaying()}>
            <Ionicons name={'stop'} size={PLAYER_ICONS_SIZE} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playerIcon}
            onPress={() => playPreviousAyah()}>
            <Ionicons name={'play-skip-back'} size={PLAYER_ICONS_SIZE} />
          </TouchableOpacity>

          {isPlaying ? (
            <TouchableOpacity
              style={styles.playerIcon}
              onPress={() => pausePlaying()}>
              <Ionicons name={'pause'} size={PLAYER_ICONS_SIZE} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.playerIcon}
              onPress={() => resumePlaying()}>
              <Ionicons name={'play'} size={PLAYER_ICONS_SIZE} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.playerIcon}
            onPress={() => playNextAyah()}>
            <Ionicons name={'play-skip-forward'} size={PLAYER_ICONS_SIZE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playerIcon}>
            <Ionicons name={'repeat'} size={PLAYER_ICONS_SIZE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playerIcon}>
            <Ionicons name={'settings'} size={PLAYER_ICONS_SIZE} />
          </TouchableOpacity>
        </View>
      )}
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
  playerIconsContainer: {
    flexDirection: 'row',
  },
  playerIcon: {
    padding: 10,
    marginLeft: 2,
    marginRight: 2,
    height: '100%',
  },
  dropdownStyle: {
    backgroundColor: 'lightgray',
    width: width - 120,
    height: height - 200,
  },
  dropdownButtonStyle: {
    backgroundColor: 'transparent',
  },
  dropdownRowStyle: {
    backgroundColor: 'white',
    height: 65,
  },
  dropdownTextStyle: {
    fontWeight: '400',
    textAlign: 'left',
  },
});
