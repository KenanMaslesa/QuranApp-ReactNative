import {Alert} from 'react-native';
import Sound from 'react-native-sound'; //https://www.npmjs.com/package/react-native-sound

let audio: Sound;

export const playAudio = (audioUrl: string) => {
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

export const stopAudio = () => {
  audio.stop();
};

export const pauseAudio = () => {
  audio.pause();
};

export const togglePlayAudio = () => {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
};

export const getCurrentTime = () => {
  const timeInSeconds = audio.getCurrentTime((seconds: number) => {
    return seconds;
  });
  return timeInSeconds;
};

export const isPlaying = (): boolean => {
  return audio.isPlaying();
};

export const setCurrentTime = (seconds: number) => {
  audio.setCurrentTime(seconds);
};

pauseAudio;
