import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';

const quranMetaData = require('@kmaslesa/quran-metadata');
const quranWordsNpm = require('@kmaslesa/holy-quran-word-by-word-min');

import {PageInfo, QuranData, Word} from '../models/models';

enum LineType {
  BISMILLAH = 'besmellah',
  START_SURA = 'start_sura',
}

enum AudioCharType {
  WORD = 'word',
  END_ICON = 'end',
}

const QuranPage: React.FC<{page: number}> = props => {
  const [quranWords, setQuranWords] = useState<QuranData>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  useEffect(() => {
    getQuranWordsforPage();
    getPageInfo();
  }, [props.page]);

  const getQuranWordsforPage = () => {
    quranWordsNpm.getWordsByPage(props.page).then((data: QuranData) => {
      setQuranWords(data);
    });
  };

  const getPageInfo = () => {
    const pageInfo = quranMetaData.getPageInfo(props.page);
    setPageInfo(pageInfo);
  };

  const playAudio = async (ayah: Word | null) => {
    Alert.alert(JSON.stringify(ayah?.charType));
    let audioUrl = '';
    if (ayah?.charType === AudioCharType.WORD) {
      audioUrl = `https://audio.qurancdn.com/${ayah.audio}`;
    }
    if (ayah?.charType === AudioCharType.END_ICON) {
      audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.ayahKey}.mp3`;
    }
    console.log(audioUrl);
  };
  return (
    <>
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
        <View style={styles.ayaLine}>
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
                  color: 'black',
                  fontFamily: `p${props.page}`,
                }}
                onPress={() => playAudio(word)}
                onLongPress={() =>
                  playAudio({
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
    </>
  );
};

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  ayaLine: {
    position: 'relative',
    flexDirection: Platform.OS === 'android' ? 'row-reverse' : 'row',
    direction: 'rtl',
  },
  juzInfo: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  suraInfo: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  pageInfo: {
    position: 'absolute',
    bottom: 30,
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
});
export default QuranPage;
