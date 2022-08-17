import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SoundPlayer from 'react-native-sound-player'; //https://www.npmjs.com/package/react-native-sound-player

const quranWordsNpm = require('@kmaslesa/holy-quran-word-by-word-min');

import {formatNumberForAudioUrl} from '../utils/formatAudioUrl';
import {headerActions} from '../redux/slices/headerSlice';
import {Ayah, PageInfo, QuranData, Word} from '../shared/models';
import {State} from '../redux/store';
import {quranActions} from '../redux/slices/quranSlice';
import {quranService} from '../services/quranService';
import TrackPlayer, {Capability, Track} from 'react-native-track-player';
import {audioService} from '../services/audioService';

enum LineType {
  BISMILLAH = 'besmellah',
  START_SURA = 'start_sura',
}

enum AudioCharType {
  WORD = 'word',
  END_ICON = 'end',
}

interface QuranPageProps {
  page: number;
  isDarkTheme: boolean;
  scrollToPage: (pageNumber: number) => void;
}

let playingAyahIndexTemp: number | undefined = -1;
const QuranPage = ({page, isDarkTheme, scrollToPage}: QuranPageProps) => {
  const dispatch = useDispatch();

  const [quranWords, setQuranWords] = useState<QuranData>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [playingWord, setPlayingWord] = useState<string | null>();
  const quranFontSize = useSelector((state: State) => state.quran.fontSize);
  const selectedQari = useSelector((state: State) => state.quran.selectedQari);
  const currentPage = useSelector((state: State) => state.quran.currentPage);
  const playingAyahIndex = useSelector(
    (state: State) => state.quran.playingAyahIndex,
  );

  useEffect(() => {
    getQuranWordsforPage();
    getPageInfo();
    audioService.setupPlayer();
  }, []);

  const getQuranWordsforPage = useCallback(() => {
    console.log('getQuranWordsforPage');
    setLoading(true);
    quranWordsNpm.getWordsByPage(page).then((data: QuranData) => {
      setQuranWords(data);
      setLoading(false);
    });
  }, [page]);

  const getPageInfo = useCallback(() => {
    setPageInfo(quranService.getPageInfo(page));
  }, [page]);

  const toggleHeader = () => {
    dispatch(headerActions.toggleHeader());
  };

  const playWord = (word: Word | null) => {
    resetPlayingAyahAndWord();
    if (!word) {
      return;
    }
    if (word.charType === AudioCharType.END_ICON) {
      playAyah(word.ayahIndex);
      return;
    }
    const audioUrl = `https://audio.qurancdn.com/${word.audio}`;
    setPlayingWord(word.audio);
    playAudio(audioUrl);
  };

  const playAyah = (ayahIndex: number | undefined) => {
    playingAyahIndexTemp = ayahIndex;
    console.log(playingAyahIndexTemp);
    resetPlayingAyahAndWord();
    const data = quranService.getAyatDetailsByAyahIndex(ayahIndex);
    if (data.page && data.page !== currentPage) {
      scrollToPage(data.page);
    }
    const suraOfAyah = data.sura;
    const ayaNumber = data.ayaNumber;
    const sura_ayah = formatNumberForAudioUrl(`${suraOfAyah}:${ayaNumber}`);
    const audioUrl = `https://www.everyayah.com/data/${selectedQari}/${sura_ayah}.mp3`;
    playAudio(audioUrl);
    dispatch(quranActions.setPlayingAyahIndex(ayahIndex));
  };

  const resetPlayingAyahAndWord = () => {
    // dispatch(quranActions.setPlayingAyahIndex(0));
    setPlayingWord('null');
  };

  const playAudio = (audioUrl: string) => {
    try {
      audioService.playAudio(audioUrl);
    } catch (e) {
      console.log('cannot play', e);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={80} color={'gray'} />
      </View>
    );
  }
  return (
    <>
      {/* <StatusBar hidden={true} /> */}

      <Pressable
        style={styles.pressableContainer}
        onPress={() => toggleHeader()}>
        <Text style={styles.suraInfo}>
          {pageInfo?.sura.map((item, index) => (
            <Text key={item.bosnian}>
              {item.bosnianTranscription}
              {index + 1 < pageInfo.sura.length && <Text>, </Text>}
            </Text>
          ))}
        </Text>
        <Text style={styles.juzInfo}>Džuz {pageInfo?.juz}</Text>

        {quranWords?.ayahs?.map((ayah: Ayah, ayahIndex: number) => (
          <View style={styles.ayaLine} key={`ayah:${ayahIndex}`}>
            {ayah.metaData?.lineType === LineType.START_SURA && (
              <View style={styles.surahTitleWrapper}>
                <Image
                  style={styles.surahTitleImage}
                  source={require('../assets/images/surah_title.gif')}
                />
                <Text style={styles.surahTitleText(isDarkTheme)}>
                  {ayah.metaData?.suraName}
                </Text>
              </View>
            )}

            {ayah.metaData?.lineType === LineType.BISMILLAH && (
              <View>
                <Text style={styles.bismillah}>﷽</Text>
              </View>
            )}

            {ayah.words?.length !== 0 &&
              ayah.words?.map(word => (
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: quranFontSize,
                    fontFamily: `p${page}`,
                    color:
                      playingAyahIndex === word?.ayahIndex ||
                      playingWord === word?.audio
                        ? 'blue'
                        : isDarkTheme
                        ? 'white'
                        : 'black',
                  }}
                  key={word?.codeV1}
                  onPress={() => playWord(word)}
                  onLongPress={() => playAyah(word?.ayahIndex)}>
                  {word?.codeV1}
                </Text>
              ))}
          </View>
        ))}
        <Text style={styles.pageInfo}>{pageInfo?.pageNumber}</Text>
      </Pressable>
    </>
  );
};

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  ayaLine: {
    position: 'relative',
    flexDirection: Platform.OS === 'android' ? 'row-reverse' : 'row',
    direction: 'rtl',
  },
  juzInfo: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
  suraInfo: {
    position: 'absolute',
    top: 35,
    left: 10,
  },
  pageInfo: {
    position: 'absolute',
    bottom: 35,
  },
  bismillah: {
    fontFamily: 'bismillah',
    fontWeight: '400',
    fontSize: 40,
    color: 'black',
  },
  surahTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 3,
    width: width,
  },
  surahTitleImage: {
    width: width - 20,
    height: 40,
  },
  surahTitleText: (isDarkTheme: boolean) => ({
    position: 'absolute',
    color: isDarkTheme ? 'white' : 'black',
  }),
  loading: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default React.memo(QuranPage);
