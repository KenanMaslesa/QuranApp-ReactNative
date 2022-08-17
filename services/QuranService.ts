const quranMetaData = require('@kmaslesa/quran-metadata');
const quranAyats = require('@kmaslesa/quran-ayats');

const getPageInfo = (pageNumber: number) => {
  return quranMetaData.getPageInfo(pageNumber);
};

const getJuzList = () => {
  return quranMetaData.getJuzList();
};

const getSuraList = () => {
  return quranMetaData.getSuraList();
};

const getAyatDetailsByAyahIndex = (ayahIndex: number | undefined) => {
  return quranAyats.getAyatByIndex(ayahIndex)[0];
};

export const quranService = {
  getPageInfo,
  getJuzList,
  getSuraList,
  getAyatDetailsByAyahIndex,
};
