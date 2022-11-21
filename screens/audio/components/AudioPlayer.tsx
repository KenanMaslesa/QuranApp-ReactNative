import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAudioPlayer from '../../../hooks/useAudioPlayer';

const ICONS_COLOR = {
  color: 'gray',
};
const PLAYER_ICONS_SIZE = 40;

const AudioPlayer = () => {
  const [
    playAudio,
    playAudioFile,
    isPlaying,
    pauseAudio,
    resumeAudio,
    stopPlayerAndRemoveSubscription,
  ] = useAudioPlayer();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isPlaying ? (
        <TouchableOpacity onPress={() => pauseAudio()}>
          <Ionicons
            name={'pause'}
            style={ICONS_COLOR}
            size={PLAYER_ICONS_SIZE}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => resumeAudio()}>
          <Ionicons
            name={'play'}
            style={ICONS_COLOR}
            size={PLAYER_ICONS_SIZE}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => stopPlayerAndRemoveSubscription()}>
        <Ionicons name={'stop'} style={ICONS_COLOR} size={PLAYER_ICONS_SIZE} />
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;
