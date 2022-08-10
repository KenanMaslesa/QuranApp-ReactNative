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

const quranWordsNpm = require('@kmaslesa/holy-quran-word-by-word-min');

import {formatNumberForAudioUrl} from '../utils/formatAudioUrl';
import {isPlaying, playAudio} from '../utils/playAudio';
import {headerActions} from '../redux/slices/headerSlice';
import {QuranService} from '../services/QuranService';
import {Ayah, PageInfo, QuranData, Word} from '../shared/models';
import {State} from '../redux/store';

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
}

const QuranPage = ({page, isDarkTheme}: QuranPageProps) => {
  const dispatch = useDispatch();

  const [quranWords, setQuranWords] = useState<QuranData>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [playingAyah, setPlayingAyah] = useState<string | null>();
  const [playingWord, setPlayingWord] = useState<string | null>();
  const quranFontSize = useSelector((state: State) => state.quran.fontSize);

  useEffect(() => {
    getQuranWordsforPage();
    getPageInfo();
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
    setPageInfo(QuranService.getPageInfo(page));
  }, [page]);

  const toggleHeader = () => {
    dispatch(headerActions.toggleHeader());
  };

  const playAyahOrWord = async (ayah: Word | null) => {
    let audioUrl = '';
    if (ayah?.charType === AudioCharType.WORD) {
      audioUrl = `https://audio.qurancdn.com/${ayah.audio}`;
      setPlayingWord(ayah.audio);
    }
    if (ayah?.charType === AudioCharType.END_ICON) {
      const sura_ayah = formatNumberForAudioUrl(
        ayah.ayahKey ? ayah.ayahKey : '',
      );
      audioUrl = `https://www.everyayah.com/data/Alafasy_128kbps/${sura_ayah}.mp3`;
      setPlayingAyah(ayah.ayahKey);
    }
    playAudio(audioUrl);

    const interval = setInterval(() => {
      if (!isPlaying()) {
        clearInterval(interval);
        setPlayingAyah(null);
        setPlayingWord('-');
      }
    }, 2000);
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
                  source={require('../assets/surah_title.gif')}
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
                      playingAyah === word?.ayahKey ||
                      playingWord === word?.audio
                        ? 'blue'
                        : isDarkTheme
                        ? 'white'
                        : 'black',
                  }}
                  key={word?.codeV1}
                  onPress={() => playAyahOrWord(word)}
                  onLongPress={() =>
                    playAyahOrWord({
                      audio: word?.audio,
                      charType: 'end',
                      ayahKey: word?.ayahKey,
                      codeV1: '',
                    })
                  }>
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
