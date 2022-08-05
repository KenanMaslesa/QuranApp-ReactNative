export const quranWords = require('@kmaslesa/holy-quran-word-by-word-full-data');

export interface QuranData {
  ayahs?: Ayah[] | null;
  page: number;
}
export interface Ayah {
  words?: (Word | null)[] | null;
  metaData: MetaData;
}
export interface Word {
  id: number;
  position: number;
  audio_url?: string | null;
  char_type_name: string;
  code_v1: string;
  page_number: number;
  line_number: number;
  text: string;
  translation: TranslationOrTransliteration;
  transliteration: Transliteration;
  parentAyahVerseKey: string;
}
export interface TranslationOrTransliteration {
  text: string;
  language_name: string;
}
export interface Transliteration {
  text?: string | null;
  language_name: string;
}
export interface MetaData {
  lineType?: string | null;
  suraName?: string | null;
}

export const transformQuranData = () => {
  quranWords.getAllQuranWords().then((data: QuranData[]) => {
    const newQuranData = data.map((page: QuranData) => ({
      page: page.page,
      ayahs: page.ayahs?.map((ayah: Ayah) => ({
        metaData: ayah.metaData,
        words: ayah.words?.map(word => ({
          codeV1: word?.code_v1,
          audio: word?.audio_url,
          charType: word?.char_type_name,
          ayahKey: word?.parentAyahVerseKey,
          //add more..
        })),
      })),
    }));
    console.log(JSON.stringify(newQuranData));
  });
};

export const fixIssuesQuranData = () => {
  let newWord: any;
  quranWords.getAllQuranWords().then((data: QuranData[]) => {
    data.forEach((page: QuranData) => {
      if (page.page === 177) {
        page.ayahs?.forEach((ayah: Ayah, ayahIndex) => {
          if (ayahIndex === 11) {
            ayah.words?.unshift(newWord);
            console.log(JSON.stringify(data));
          }
          ayah.words?.forEach((word, wordIndex) => {
            if (word?.audio_url === 'wbw/008_006_010.mp3') {
              newWord = page.ayahs[ayahIndex].words[wordIndex];
              ayah.words?.pop();
            }
          });
        });
      }

      if (page.page === 187) {
        page.ayahs?.forEach((ayah: Ayah) => {
          ayah.metaData = {
            suraName: 'Et-Tevbe - التوبة',
            lineType: 'start_sura',
          };
          console.log(JSON.stringify(data));
        });
      }
    });
  });
};
