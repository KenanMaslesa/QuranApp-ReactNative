export const formatNumberForAudioUrl = (ayahKey: string) => {
  // ayahKey: 1:7
  const suraNumber = ayahKey.split(':')[0];
  const ayahNumber = ayahKey.split(':')[1];
  const sura = formatSuraAndAyahNumber(+suraNumber);
  const ayah = formatSuraAndAyahNumber(+ayahNumber);
  const result = sura + ayah;
  return result;
};

const formatSuraAndAyahNumber = (
  suraNumber: number,
): string | undefined | number => {
  let tempNumber;
  if (suraNumber >= 100) {
    tempNumber = suraNumber;
  } else if (suraNumber >= 10 && suraNumber < 100) {
    tempNumber = '0' + suraNumber;
  } else if (suraNumber < 10) {
    tempNumber = '00' + suraNumber;
  }
  return tempNumber;
};
