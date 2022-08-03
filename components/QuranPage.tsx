import React from 'react';
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
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';

const quranMetaData = require('@kmaslesa/quran-metadata');
const quranWordsNpm = require('@kmaslesa/holy-quran-word-by-word-min');

import {PageInfo, QuranData, Word} from '../models/models';
import {formatNumberForAudioUrl} from '../utils/formatAudioUrl';
import {isPlaying, playAudio} from '../utils/playAudio';
import {headerActions} from '../redux/slices/headerSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';

enum LineType {
  BISMILLAH = 'besmellah',
  START_SURA = 'start_sura',
}

enum AudioCharType {
  WORD = 'word',
  END_ICON = 'end',
}

const QuranPage: React.FC<{page: number}> = props => {
  console.log('QuranPage');
  const dispatch = useDispatch();

  const [quranWords, setQuranWords] = useState<QuranData>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [playingAyah, setPlayingAyah] = useState<string | null>();
  const [playingWord, setPlayingWord] = useState<string | null>();

  useEffect(() => {
    getQuranWordsforPage();
    getPageInfo();
  }, [props.page]);

  const getQuranWordsforPage = () => {
    console.log('getQuranWordsforPage');
    setLoading(true);
    quranWordsNpm.getWordsByPage(props.page).then((data: QuranData) => {
      setQuranWords(data);
      setLoading(false);
    });
  };

  const getPageInfo = () => {
    setPageInfo(quranMetaData.getPageInfo(props.page));
  };

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
    }, 1000);
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
            <Text>
              {item.bosnianTranscription}
              {index + 1 < pageInfo.sura.length && <Text>, </Text>}
            </Text>
          ))}
        </Text>
        <Text style={styles.juzInfo}>Džuz {pageInfo?.juz}</Text>

        {quranWords?.ayahs?.map(ayah => (
          <View style={styles.ayaLine} key={JSON.stringify(uuid.v4())}>
            {ayah.metaData?.lineType === LineType.START_SURA && (
              <View style={styles.surahTitleWrapper}>
                <Image
                  style={styles.surahTitleImage}
                  source={require('../assets/surah_title.gif')}
                />
                <Text style={styles.surahTitleText}>
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
                    fontSize: 25,
                    fontFamily: `p${props.page}`,
                    color:
                      playingAyah === word?.ayahKey ||
                      playingWord === word?.audio
                        ? 'blue'
                        : 'black',
                  }}
                  key={JSON.stringify(uuid.v4())}
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
    right: 0,
  },
  suraInfo: {
    position: 'absolute',
    top: 35,
    left: 0,
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
  surahTitleText: {
    position: 'absolute',
    color: 'black',
  },
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
