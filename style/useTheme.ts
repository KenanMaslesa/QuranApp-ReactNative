import {useSelector} from 'react-redux';
import {State} from '../redux/store';
import {Color, darkColors, lightColors} from './themes';

interface ThemeColorStyle {
  backgroundPrimary: {
    backgroundColor: string;
  };
  backgroundSecondary: {
    backgroundColor: string;
  };
  backgroundTertiary: {
    backgroundColor: string;
  };
  colorPrimary: {
    color: string;
  };
  colorSecondary: {
    color: string;
  };
  colorTertiary: {
    color: string;
  };
}
const useThemeColor = (): [ThemeColorStyle, Color] => {
  const isDarkTheme = useSelector((state: State) => state.theme.isDarkTheme);
  const themeColors: Color = isDarkTheme ? darkColors : lightColors;

  const themeColorStyle: ThemeColorStyle = {
    backgroundPrimary: {
      backgroundColor: themeColors.backgroundPrimary,
    },
    backgroundSecondary: {
      backgroundColor: themeColors.backgroundSecondary,
    },
    backgroundTertiary: {
      backgroundColor: themeColors.backgroundTertiary,
    },
    colorPrimary: {
      color: themeColors.colorPrimary,
    },
    colorSecondary: {
      color: themeColors.colorSecondary,
    },
    colorTertiary: {
      color: themeColors.colorTertiary,
    },
  };

  return [themeColorStyle, themeColors];
};

export default useThemeColor;
