import SystemNavigationBar from 'react-native-system-navigation-bar'; // https://www.npmjs.com/package/react-native-system-navigation-bar

const hideNavigation = () => {
  SystemNavigationBar.navigationHide();
  //   StatusBar.setHidden(true, 'slide');
};

const showNavigation = () => {
  SystemNavigationBar.navigationShow();
};

const stickyImmersive = () => {
  SystemNavigationBar.stickyImmersive();
};

const leanBack = () => {
  SystemNavigationBar.leanBack();
};

const setFullScreen = (isFullScreen: boolean) => {
  SystemNavigationBar.fullScreen(isFullScreen);
};

const setNavigationAndBarMode = (isDark: boolean) => {
  SystemNavigationBar.setBarMode(isDark ? 'dark' : 'light', 'both');
};

const setNavigationAndBarColor = (color: string, isDarkTheme: boolean) => {
  SystemNavigationBar.setNavigationColor(
    color,
    isDarkTheme ? 'dark' : 'light',
    'both',
  );
};

export const systemNavigationBarService = {
  hideNavigation,
  showNavigation,
  setFullScreen,
  setNavigationAndBarMode,
  setNavigationAndBarColor,
  stickyImmersive,
  leanBack,
};
