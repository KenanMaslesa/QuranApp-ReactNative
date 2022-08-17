import {Alert} from 'react-native';
import Sound from 'react-native-sound'; //https://www.npmjs.com/package/react-native-sound

let audio: Sound = new Sound('');

const playAudio = (audioUrl: string) => {
  if (audio) {
    audio.stop();
  }

  audio = new Sound(audioUrl, '', (error: any) => {
    if (error) {
      Alert.alert('error: ' + error.message);
      return;
    }
    audio.play(() => {
      audio.release();
    });
  });
};

const stopAudio = () => {
  audio.stop();
};

const pauseAudio = () => {
  audio.pause();
};

const togglePlayAudio = () => {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
};

const getCurrentTime = () => {
  const timeInSeconds = audio.getCurrentTime((seconds: number) => {
    return seconds;
  });
  return timeInSeconds;
};

const isAudioPlaying = (): boolean => {
  return audio.isPlaying();
};

const setCurrentTime = (seconds: number) => {
  audio.setCurrentTime(seconds);
};

export const audioService = {
  playAudio,
  stopAudio,
  pauseAudio,
  togglePlayAudio,
  getCurrentTime,
  isAudioPlaying,
  setCurrentTime,
};
