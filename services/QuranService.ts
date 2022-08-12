const quranMetaData = require('@kmaslesa/quran-metadata');

const getPageInfo = (pageNumber: number) => {
  return quranMetaData.getPageInfo(pageNumber);
};

const getJuzList = () => {
  return quranMetaData.getJuzList();
};

const getSuraList = () => {
  return quranMetaData.getSuraList();
};

export const quranService = {
  getPageInfo,
  getJuzList,
  getSuraList,
};
