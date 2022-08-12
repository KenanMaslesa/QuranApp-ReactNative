import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {quranActions} from '../redux/slices/quranSlice';

const quranTranslation = require('@kmaslesa/quran-translations');

interface QuranTranslationProps {
  pageNumber: number;
}
const QuranTranslationBottomSheet = ({pageNumber}: QuranTranslationProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const [translations, setTranslations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTranslationForPage();
    modalizeRef.current?.open();
  }, [pageNumber]);

  const getTranslationForPage = () => {
    setTranslations(quranTranslation.getTranslationByPage(pageNumber));
  };

  return (
    <>
      <Modalize
        onClose={() => dispatch(quranActions.setShowTranslation(false))}
        threshold={100}
        handleStyle={{backgroundColor: 'blue'}}
        ref={modalizeRef}
        // alwaysOpen={100}
        closeSnapPointStraightEnabled={false}
        withOverlay={false}
        modalHeight={200}>
        <View>
          {translations.map(item => (
            <View key={item.index}>
              <Text style={{padding: 5, marginBottom: 10, color: 'black'}}>
                {item.translation.bosnianKorkut}
              </Text>
            </View>
          ))}
        </View>
      </Modalize>
    </>
  );
};

export default QuranTranslationBottomSheet;
