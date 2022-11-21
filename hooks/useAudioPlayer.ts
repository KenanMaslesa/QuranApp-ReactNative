import {useCallback, useState} from 'react';
import {EmitterSubscription} from 'react-native';
import SoundPlayer from 'react-native-sound-player'; //https://www.npmjs.com/package/react-native-sound-player

let subscriptionSoundPlayer: EmitterSubscription;

type QuranPlayerReturnType = [
  (audioUrl: string) => void, // playAudio
  (audioUrl: string) => void, // playAudioFile
  boolean,
  () => void,
  () => void,
  () => void, // stopPlayerAndRemoveSubscription
];
const useAudioPlayer = (): QuranPlayerReturnType => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playAudio = useCallback(async (ayahUrl: string) => {
    try {
      if (subscriptionSoundPlayer && !isPlaying) {
        subscriptionSoundPlayer.remove();
      }
      await SoundPlayer.playUrl(ayahUrl);
      setIsPlaying(true);
      subscriptionSoundPlayer = SoundPlayer.addEventListener(
        'FinishedPlaying',
        () => {
          subscriptionSoundPlayer.remove();
          setIsPlaying(false);
        },
      );
    } catch (error) {
      console.log('cannot play', error);
    }
  }, []);

  const playAudioFile = useCallback(async (ayahUrl: string) => {
    try {
      if (subscriptionSoundPlayer && !isPlaying) {
        subscriptionSoundPlayer.remove();
      }
      await SoundPlayer.playSoundFile(ayahUrl, 'mp3');
      setIsPlaying(true);
      subscriptionSoundPlayer = SoundPlayer.addEventListener(
        'FinishedPlaying',
        () => {
          subscriptionSoundPlayer.remove();
          setIsPlaying(false);
        },
      );
    } catch (error) {
      console.log('cannot play', error);
    }
  }, []);

  const stopPlayerAndRemoveSubscription = () => {
    SoundPlayer.stop();
    subscriptionSoundPlayer.remove();
    setIsPlaying(false);
  };

  const pauseAudio = () => {
    SoundPlayer.pause();
    setIsPlaying(false);
  };

  const resumeAudio = () => {
    SoundPlayer.resume();
    setIsPlaying(true);
  };

  return [
    playAudio,
    playAudioFile,
    isPlaying,
    pauseAudio,
    resumeAudio,
    stopPlayerAndRemoveSubscription,
  ];
};

export default useAudioPlayer;
