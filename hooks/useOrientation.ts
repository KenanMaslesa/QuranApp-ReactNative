import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export enum ORIENTATION {
  PORTRAIT = 'PORTRAIT',
  LANDSPACE = 'LANDSPACE',
}

const useOrientation = () => {
  const [orientation, setOrientation] = useState<ORIENTATION>(
    ORIENTATION.PORTRAIT,
  );

  useEffect(() => {
    getOrientation();
  }, [orientation]);

  const getOrientation = () => {
    Dimensions.addEventListener('change', () => {
      console.log('changed orientation');
      // orientation has changed, check if it is portrait or landscape here
      if (isPortrait()) {
        setOrientation(ORIENTATION.PORTRAIT);
      }
      if (isLandscape()) {
        setOrientation(ORIENTATION.LANDSPACE);
      }
    });
  };

  const isPortrait = (): boolean => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const isLandscape = (): boolean => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  };

  return orientation;
};

export default useOrientation;
