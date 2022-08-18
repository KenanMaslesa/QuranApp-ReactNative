import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';

import {qariList} from '../data/data';
import SoundPlayer from 'react-native-sound-player';
import {State} from '../redux/store';
import useQuranPlayer from '../hooks/useQuranPlayer';
import {quranPlayerActions} from '../redux/slices/quranPlayerSlice';

const PLAYER_ICONS_SIZE = 22;

const QuranPlayer = () => {
  const dispatch = useDispatch();
  const {isPlaying, isStoped, selectedQari, playingAyahIndex} = useSelector(
    (state: State) => state.quranPlayer,
  );
  const [playAyahAudio, resetPlayingAyahAndWord] = useQuranPlayer();

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
          <SelectDropdown
            data={qariList.map(qari => qari.identifier)}
            defaultValue={selectedQari}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              dispatch(quranPlayerActions.setSelectedQari(selectedItem));
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
    marginLeft: 10,
    marginRight: 10,
  },
});
