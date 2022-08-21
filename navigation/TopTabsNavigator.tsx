import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SuraScreen from '../screens/home';
import JuzScreen from '../screens/JuzScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import HomeHeader from '../screens/home/components/HomeHeader';
import {SCREENS} from '../screens/constants';
import {useEffect} from 'react';
import {CHANNELS, NotificationService} from '../services/notifications';
import Loader from '../shared/components/Loader';
import useThemeColor from '../style/useTheme';
import {useFocusEffect} from '@react-navigation/native';
import {systemNavigationBarService} from '../services/systemNavigationBarService';

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  const [, themeColors] = useThemeColor();

  useEffect(() => {
    NotificationService.createChannel(CHANNELS.Quran);
  }, []);

  useFocusEffect(() => {
    systemNavigationBarService.showNavigation();
  });

  return (
    <>
      <HomeHeader />
      <Tab.Navigator
        initialRouteName={SCREENS.SURA_SCREEN}
        screenOptions={{
          tabBarActiveTintColor: themeColors.colorPrimary,
          tabBarInactiveTintColor: themeColors.colorTertiary,
          tabBarIndicatorStyle: {
            backgroundColor: themeColors.colorTertiary,
            height: 4,
            borderRadius: 5,
          },
          lazy: false,
          lazyPlaceholder: () => {
            return <Loader />;
          },
          tabBarLabelStyle: {fontSize: 14},
          tabBarStyle: {backgroundColor: themeColors.backgroundPrimary},
        }}>
        <Tab.Screen
          name={SCREENS.SURA_SCREEN}
          component={SuraScreen}
          options={{tabBarLabel: 'Sura'}}
        />
        <Tab.Screen
          name={SCREENS.JUZ_SCREEN}
          component={JuzScreen}
          options={{tabBarLabel: 'Juz'}}
        />
        <Tab.Screen
          name={SCREENS.BOOKMARK_SCREEN}
          component={BookmarkScreen}
          options={{tabBarLabel: 'Bookmark'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopTabsNavigator;
