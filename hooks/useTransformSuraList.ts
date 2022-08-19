import {useEffect, useState} from 'react';
import {juzToSura} from '../data/data';
import {quranService} from '../services/quranService';
import {IJuzSuraCard, Sura} from '../shared/models';

let juzToSuraArray: IJuzSuraCard[] = [];
const useTransformSuraList = () => {
  const [suraList] = useState<Sura[]>(quranService.getSuraList());
  useEffect(() => {
    if (suraList.length > 0) {
      juzToSuraArray = juzToSura.map((juz, juzIndex) => ({
        juz: {
          juzNumber: juzIndex + 1,
          startPage: quranService.getJuzById(juzIndex + 1).startPage,
        },
        surahs: juz.map(sura => suraList[sura - 1]),
      }));
      console.log(juzToSuraArray);
    }
  }, [suraList]);
};

export default useTransformSuraList;
