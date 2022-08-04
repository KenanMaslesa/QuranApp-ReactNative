const quranMetaData = require('@kmaslesa/quran-metadata');

export const getPageInfo = (pageNumber: number) => {
  return quranMetaData.getPageInfo(pageNumber);
};

export const QuranService = {
  getPageInfo,
};
