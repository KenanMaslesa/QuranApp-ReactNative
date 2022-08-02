import React, {useEffect} from 'react';
import {Alert, Text} from 'react-native';
import {Ayah, QuranData, Word} from '../models/models';
const quranWordsNpm = require('@kmaslesa/quran-word-by-word');

let page = 1;
const QURAN_PAGES_NUMBER = 1;
const quranPagesArray: QuranData[] = [];

const groupLinesByVerses = (verses: Ayah[]): Word[] => {
  let words: Word[] = [];

  // Flattens the verses into an array of words
  verses.forEach((verse: Ayah) => {
    words = [...words, ...getVerseWords(verse)];
  });

  return words;
};

const getVerseWords = (verse: Ayah): Word[] => {
  const words: Word[] = [];
  verse.words?.forEach((word: Word) => {
    words.push({
      ...word,
    });
  });
  return words;
};

const GetQuranData = () => {
  useEffect(() => {
    getQuranWordsforPage();
  }, []);
  const getQuranWordsforPage = () => {
    if (page > QURAN_PAGES_NUMBER) {
      Alert.alert(`Preuzete stranice: ${page - 1}`);
      console.log(JSON.stringify(quranPagesArray));
      return;
    }
    fetch(`https://api.quran.com/api/v4/verses/by_page/${page}?words=true`)
      .then(res => res.json())
      .then(data => {
        const allPageWords = groupLinesByVerses(data.verses);
        const lineNumbers = allPageWords.map(wordItem => wordItem.line_number);
        let uniqueLineNumbers = [...new Set(lineNumbers)];

        const quranData: QuranData = {ayahs: []};

        uniqueLineNumbers.forEach(lineNumber => {
          const lineWords: Word[] = [];
          allPageWords.forEach((word: Word) => {
            if (word.line_number === lineNumber) {
              lineWords.push(word);
            }
          });

          quranData.ayahs?.push({
            words: lineWords,
            metaData: {},
          });
        });

        const npmQuranWords = quranWordsNpm.getWordsByPage(page);
        console.log(npmQuranWords.ayahs);

        let npmAyahIndex = 0;
        npmQuranWords.ayahs.forEach(npmAyah => {
          if (npmAyah.words.length !== 0) {
            npmAyah.words = quranData.ayahs[npmAyahIndex].words;
            npmAyahIndex++;
          }
        });
        console.log(page);
        quranPagesArray.push(npmQuranWords);
        page++;
        getQuranWordsforPage();
      });
  };
  return <Text>{quranPagesArray.length}</Text>;
};

export default GetQuranData;
