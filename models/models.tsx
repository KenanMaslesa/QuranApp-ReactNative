export interface Sura {
  index: number;
  numberOfAyas: number;
  startAyaIndex: number;
  name: SuraName;
  aboutSura: AboutSura;
  type: string;
  orderInPublishing: number;
  numberOfWords: number;
  numberOfLetters: number;
  startJuz: number;
  endJuz: number;
  startPage: number;
  endPage: number;
  totalPages: number;
}
export interface SuraName {
  arabic: string;
  english: string;
  englishTranscription: string;
  bosnian: string;
  bosnianTranscription: string;
}
export interface AboutSura {
  bosnian: string;
}

export interface PageInfo {
  pageNumber: number;
  sura: SuraName[];
  juz: number;
  wordsNumber: number;
  lettersNumber: number;
}

export interface Juz {
  id: number;
  juzNumber: number;
  surahs?: JuzSura[] | null;
  firstAyahId: number;
  lastAyahId: number;
  numberOfAyahs: number;
  startPage: number;
  endPage: number;
}
export interface JuzSura {
  id: number;
  startAyah: number;
  endAyah: number;
  name: JuzSuraName;
}
export interface JuzSuraName {
  arabic: string;
  english: string;
  englishTranscription: string;
  bosnian: string;
  bosnianTranscription: string;
}

//new
export interface QuranData {
  ayahs?: Ayah[] | null;
  page: number;
}
export interface Ayah {
  words?: (Word | null)[] | null;
  metaData: MetaData;
}
export interface Word {
  audio?: string | null;
  charType: string;
  codeV1: string;
  ayahKey?: string;
}

export interface MetaData {
  lineType?: string | null;
  suraName?: string | null;
}
