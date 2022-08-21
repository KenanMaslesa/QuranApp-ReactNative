import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color'; // https://github.com/thebylito/react-native-navigation-bar-color#installation
import {StatusBar} from 'react-native';

const setNavigationColor = (color: string, isLightTheme: boolean) => {
  changeNavigationBarColor(color, isLightTheme, true);
};

const hideNavigation = () => {
  hideNavigationBar();
  StatusBar.setHidden(true, 'slide');
};

const showNavigation = () => {
  showNavigationBar();
  StatusBar.setHidden(false, 'slide');
};

export const navigationBarService = {
  hideNavigation,
  showNavigation,
  setNavigationColor,
};
