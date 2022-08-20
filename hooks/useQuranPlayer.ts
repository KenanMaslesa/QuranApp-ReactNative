import {useState} from 'react';
import {EmitterSubscription} from 'react-native';
import SoundPlayer from 'react-native-sound-player'; //https://www.npmjs.com/package/react-native-sound-player
import {useDispatch, useSelector} from 'react-redux';
import {
  quranPlayerActions,
  REPEAT_OPTIONS,
} from '../redux/slices/quranPlayerSlice';

import {quranActions} from '../redux/slices/quranSlice';
import {State} from '../redux/store';
import {quranService} from '../services/quranService';
import {Word} from '../shared/models';
import {formatNumberForAudioUrl} from '../utils/formatAudioUrl';

let isFinishedPlaying: boolean = false;
let subscriptionSoundPlayer: EmitterSubscription;
let playingAyahIndexTemp: number = -1;
let repeatAyahCounter: number = 0;

enum AudioCharType {
  WORD = 'word',
  END_ICON = 'end',
}
type QuranPlayerReturnType = [
  (ayahIndex: number | undefined) => void, // playAyahAudio
  (word: Word | null) => void, // playWord
  string | null | undefined, // playingWord
  () => void, // resetPlayingAyahAndWord
  () => void, // stopPlayerAndRemoveSubscription
];
const useQuranPlayer = (): QuranPlayerReturnType => {
  const dispatch = useDispatch();
  const [playingWord, setPlayingWord] = useState<string | null>();
  const {selectedQari, repeatNumber} = useSelector(
    (state: State) => state.quranPlayer,
  );
  const {currentPage} = useSelector((state: State) => state.quran);

  const playAyahAudio = async (
    ayahIndex: number | undefined,
    calledByUser: boolean = true,
  ) => {
    if (calledByUser) {
      repeatAyahCounter = 0;
    }
    resetPlayingAyahAndWord();
    playingAyahIndexTemp = ayahIndex ? ayahIndex : -1;
    dispatch(quranPlayerActions.setPlayingAyahIndex(ayahIndex));

    const ayahDetails = quranService.getAyatDetailsByAyahIndex(ayahIndex);
    if (ayahDetails.page && ayahDetails.page !== currentPage) {
      dispatch(quranActions.setScrollToPage(ayahDetails.page));
    }
    const suraOfAyah = ayahDetails.sura;
    const ayaNumber = ayahDetails.ayaNumber;
    const sura_ayah = formatNumberForAudioUrl(`${suraOfAyah}:${ayaNumber}`);
    const audioUrl = `https://www.everyayah.com/data/${selectedQari.value}/${sura_ayah}.mp3`;

    playAyah(audioUrl);
  };

  const playAyah = async (ayahUrl: string) => {
    dispatch(quranPlayerActions.setIsStoped(false));
    dispatch(quranPlayerActions.setIsPlaying(true));
    isFinishedPlaying = false;

    console.log(repeatNumber);

    try {
      if (subscriptionSoundPlayer && !isFinishedPlaying) {
        subscriptionSoundPlayer.remove();
      }
      await SoundPlayer.playUrl(ayahUrl);
      subscriptionSoundPlayer = SoundPlayer.addEventListener(
        'FinishedPlaying',
        () => {
          dispatch(quranPlayerActions.setIsPlaying(false));
          isFinishedPlaying = true;
          subscriptionSoundPlayer.remove();
          resetPlayingAyahAndWord();

          let ayahIndex: number;
          if (repeatNumber === REPEAT_OPTIONS.NO_REPEAT) {
            ayahIndex = playingAyahIndexTemp + 1; // play next ayah
          } else if (repeatNumber === REPEAT_OPTIONS.INFINITY) {
            ayahIndex = playingAyahIndexTemp; // play the same ayah
          } else if (repeatAyahCounter >= repeatNumber) {
            // repeating is done
            repeatAyahCounter = 0; // reset counter
            ayahIndex = playingAyahIndexTemp + 1; // play next ayah
          } else {
            // repeating is in progress
            repeatAyahCounter++;
            ayahIndex = playingAyahIndexTemp; // play the same ayah
          }

          playAyahAudio(ayahIndex, false);
        },
      );
    } catch (error) {
      console.log('cannot play', error);
    }
  };

  const resetPlayingAyahAndWord = () => {
    dispatch(quranPlayerActions.setPlayingAyahIndex(0));
    setPlayingWord('null');
  };

  const stopPlayerAndRemoveSubscription = () => {
    repeatAyahCounter = 0;
    SoundPlayer.stop();
    subscriptionSoundPlayer.remove();
  };

  const playWord = (word: Word | null) => {
    resetPlayingAyahAndWord();
    if (subscriptionSoundPlayer) {
      subscriptionSoundPlayer.remove();
    }
    if (!word) {
      return;
    }
    if (word.charType === AudioCharType.END_ICON) {
      playAyahAudio(word.ayahIndex);
      return;
    }
    const audioUrl = `https://audio.qurancdn.com/${word.audio}`;
    setPlayingWord(word.audio);

    try {
      SoundPlayer.playUrl(audioUrl);
      SoundPlayer.addEventListener('FinishedPlaying', () => {
        resetPlayingAyahAndWord();
      });
    } catch (error) {
      console.log('cannot play', error);
    }
  };

  return [
    playAyahAudio,
    playWord,
    playingWord,
    resetPlayingAyahAndWord,
    stopPlayerAndRemoveSubscription,
  ];
};

export default useQuranPlayer;
