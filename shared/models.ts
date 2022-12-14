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
  ayahIndex?: number;
}

export interface MetaData {
  lineType?: string | null;
  suraName?: string | null;
}

export interface DispatchType<PayloadType> {
  payload?: PayloadType;
  type: string;
}

export interface Bookmark {
  sura: SuraName;
  juzNumber: number;
  pageNumber: number;
  date: string;
}

export interface Qari {
  value: string;
  name: string;
}

// juz to sura
export interface IJuzSuraCard {
  juz: {juzNumber: number; startPage: number};
  surahs: Sura[];
}

// juz to hizb
export interface JuzToHizbModel {
  juz: HizbJuz;
  hizbs?: Hizb[] | null;
}
export interface HizbJuz {
  juzNumber: number;
  startPage: number;
}
export interface Hizb {
  hizbNumber?: number | null;
  suraName: string;
  suraIndex: number;
  ayahNumber: number;
  page: number;
  ayah: string;
}
