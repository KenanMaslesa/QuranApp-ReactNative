import React, {useEffect} from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdownWithSearch from 'react-native-select-dropdown-with-search';

import {qariList} from '../../../data/data';
import SoundPlayer from 'react-native-sound-player';
import {State} from '../../../redux/store';
import useQuranPlayer from '../../../hooks/useQuranPlayer';
import {
  quranPlayerActions,
  REPEAT_OPTIONS,
} from '../../../redux/slices/quranPlayerSlice';
import {Qari} from '../../../shared/models';
import {
  getSelectedQari,
  setSelectedQari,
} from '../../../redux/actions/quranPlayerActions';
import useThemeColor from '../../../style/useTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PLAYER_ICONS_SIZE = 25;
const {width, height} = Dimensions.get('screen');
interface SelectDropdownItem {
  name: string;
  value: string;
}
const QuranPlayer = () => {
  const dispatch = useDispatch();
  const [themeColorStyle] = useThemeColor();
  const ICONS_COLOR = themeColorStyle.colorSecondary;
  const {isPlaying, isStoped, selectedQari, playingAyahIndex, repeatNumber} =
    useSelector((state: State) => state.quranPlayer);
  const [
    playAyahAudio,
    playWord,
    playingWord,
    resetPlayingAyahAndWord,
    stopPlayerAndRemoveSubscription,
  ] = useQuranPlayer();

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

  const toggleRepeat = () => {
    stopPlayerAndRemoveSubscription();
    dispatch(quranPlayerActions.toggleRepeatNumber());
    playAyahAudio(playingAyahIndex);
  };

  return (
    <View style={[styles.playerContainer, themeColorStyle.backgroundTertiary]}>
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
            buttonTextStyle={themeColorStyle.colorPrimary}
            dropdownStyle={[
              styles.dropdownStyle,
              themeColorStyle.backgroundTertiary,
            ]}
            rowStyle={[
              styles.dropdownRowStyle,
              themeColorStyle.backgroundPrimary,
            ]}
            rowTextStyle={[
              styles.dropdownTextStyle,
              themeColorStyle.colorPrimary,
            ]}
            dropdownOverlayColor={'#0008'}
          />
        </View>
      ) : (
        <View style={styles.playerIconsContainer}>
          <TouchableOpacity
            style={styles.playerIcon}
            onPress={() => stopPlaying()}>
            <Ionicons
              name={'stop'}
              style={ICONS_COLOR}
              size={PLAYER_ICONS_SIZE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playerIcon}
            onPress={() => playPreviousAyah()}>
            <Ionicons
              name={'play-skip-back'}
              style={ICONS_COLOR}
              size={PLAYER_ICONS_SIZE}
            />
          </TouchableOpacity>

          {isPlaying ? (
            <TouchableOpacity
              style={styles.playerIcon}
              onPress={() => pausePlaying()}>
              <Ionicons
                name={'pause'}
                style={ICONS_COLOR}
                size={PLAYER_ICONS_SIZE}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.playerIcon}
              onPress={() => resumePlaying()}>
              <Ionicons
                name={'play'}
                style={ICONS_COLOR}
                size={PLAYER_ICONS_SIZE}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.playerIcon}
            onPress={() => playNextAyah()}>
            <Ionicons
              name={'play-skip-forward'}
              style={ICONS_COLOR}
              size={PLAYER_ICONS_SIZE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playerIcon}
            onPress={() => toggleRepeat()}>
            <View style={styles.flexDirectionRow}>
              <MaterialCommunityIcons
                name={
                  repeatNumber === REPEAT_OPTIONS.NO_REPEAT
                    ? 'repeat-off'
                    : 'repeat'
                }
                style={ICONS_COLOR}
                size={PLAYER_ICONS_SIZE}
              />
              {repeatNumber !== REPEAT_OPTIONS.NO_REPEAT &&
                repeatNumber !== REPEAT_OPTIONS.INFINITY && (
                  <Text>{repeatNumber}</Text>
                )}
              {repeatNumber === REPEAT_OPTIONS.INFINITY && <Text>∞</Text>}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playerIcon}>
            <Ionicons
              name={'settings'}
              style={ICONS_COLOR}
              size={PLAYER_ICONS_SIZE}
            />
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
    width: width - 120,
    height: height - 200,
  },
  dropdownButtonStyle: {
    backgroundColor: 'transparent',
  },
  dropdownRowStyle: {
    height: 65,
  },
  dropdownTextStyle: {
    fontWeight: '400',
    textAlign: 'left',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});
