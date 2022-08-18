import {useState} from 'react';
import {EmitterSubscription} from 'react-native';
import SoundPlayer from 'react-native-sound-player'; //https://www.npmjs.com/package/react-native-sound-player
import {useDispatch, useSelector} from 'react-redux';
import {quranPlayerActions} from '../redux/slices/quranPlayerSlice';

import {quranActions} from '../redux/slices/quranSlice';
import {State} from '../redux/store';
import {quranService} from '../services/quranService';
import {Word} from '../shared/models';
import {formatNumberForAudioUrl} from '../utils/formatAudioUrl';

let isFinishedPlaying: boolean = false;
let subscriptionSoundPlayer: EmitterSubscription;
let playingAyahIndexTemp: number | undefined = -1;

enum AudioCharType {
  WORD = 'word',
  END_ICON = 'end',
}

const useQuranPlayer = () => {
  const dispatch = useDispatch();
  const [playingWord, setPlayingWord] = useState<string | null>();
  const {selectedQari} = useSelector((state: State) => state.quranPlayer);
  const {currentPage} = useSelector((state: State) => state.quran);

  const playAyahAudio = async (ayahIndex: number | undefined) => {
    playingAyahIndexTemp = ayahIndex;
    console.log(playingAyahIndexTemp);
    resetPlayingAyahAndWord();
    dispatch(quranPlayerActions.setPlayingAyahIndex(ayahIndex));
    const data = quranService.getAyatDetailsByAyahIndex(ayahIndex);
    if (data.page && data.page !== currentPage) {
      dispatch(quranActions.setScrollToPage(data.page));
    }
    const suraOfAyah = data.sura;
    const ayaNumber = data.ayaNumber;
    const sura_ayah = formatNumberForAudioUrl(`${suraOfAyah}:${ayaNumber}`);
    const audioUrl = `https://www.everyayah.com/data/${selectedQari.value}/${sura_ayah}.mp3`;

    playAyah(audioUrl);
  };

  const playAyah = async (ayahUrl: string) => {
    try {
      if (subscriptionSoundPlayer && !isFinishedPlaying) {
        subscriptionSoundPlayer.remove();
      }
      await SoundPlayer.playUrl(ayahUrl);
      dispatch(quranPlayerActions.setIsStoped(false));
      dispatch(quranPlayerActions.setIsPlaying(true));
      const info = await SoundPlayer.getInfo();
      console.log('getInfo', info);
      isFinishedPlaying = false;
      subscriptionSoundPlayer = SoundPlayer.addEventListener(
        'FinishedPlaying',
        () => {
          dispatch(quranPlayerActions.setIsPlaying(false));
          isFinishedPlaying = true;
          subscriptionSoundPlayer.remove();
          resetPlayingAyahAndWord();
          let temp = playingAyahIndexTemp ? playingAyahIndexTemp + 1 : 0;
          playAyahAudio(temp);
        },
      );
    } catch (e) {
      console.log('cannot play', e);
    }
  };

  const resetPlayingAyahAndWord = () => {
    dispatch(quranPlayerActions.setPlayingAyahIndex(0));
    setPlayingWord('null');
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
    } catch (e) {
      console.log('cannot play', e);
    }
  };

  return [playAyahAudio, playWord, playingWord, resetPlayingAyahAndWord];
};

export default useQuranPlayer;
