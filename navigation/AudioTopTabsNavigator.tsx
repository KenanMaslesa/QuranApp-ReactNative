import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SCREENS} from '../screens/constants';
import Loader from '../shared/components/Loader';
import useThemeColor from '../style/useTheme';
import DownloadedAudioScreen from '../screens/audio/DownloadedAudioScreen';
import AudioScreen from '../screens/audio/AudioScreen';

const Tab = createMaterialTopTabNavigator();

const AudioTopTabsNavigator = () => {
  const [, themeColors] = useThemeColor();

  return (
    <>
      <Tab.Navigator
        initialRouteName={SCREENS.AUDIO_SCREEN}
        screenOptions={{
          tabBarActiveTintColor: themeColors.colorPrimary,
          tabBarInactiveTintColor: themeColors.colorTertiary,
          tabBarIndicatorStyle: {
            backgroundColor: themeColors.colorTertiary,
            height: 4,
            borderRadius: 5,
          },
          lazy: true,
          lazyPlaceholder: () => {
            return <Loader />;
          },
          tabBarLabelStyle: {fontSize: 14},
          tabBarStyle: {backgroundColor: themeColors.backgroundPrimary},
        }}>
        <Tab.Screen
          name={SCREENS.AUDIO_SCREEN}
          component={AudioScreen}
          options={{tabBarLabel: 'Audio'}}
        />
        <Tab.Screen
          name={SCREENS.DOWNLOADED_AUDIO_SCREEN}
          component={DownloadedAudioScreen}
          options={{tabBarLabel: 'Downloads'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default AudioTopTabsNavigator;
