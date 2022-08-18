import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import QuranScreen from '../screens/quran';
import TopTabsNavigator from './TopTabsNavigator';
import QuranPageHeader from '../screens/quran/components/QuranPageHeader';
import SettingsScreen from '../screens/SettingsScreen';
import {SCREENS} from '../screens/constants';
import Loader from '../shared/components/Loader';
import {useSelector} from 'react-redux';
import {State} from '../redux/store';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const showHeader = useSelector((state: State) => state.header.showHeader);
  return (
    <>
      <Loader />

      <Stack.Navigator
        initialRouteName={SCREENS.TOP_TAB_NAVIGATOR}
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          name={SCREENS.TOP_TAB_NAVIGATOR}
          component={TopTabsNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREENS.QURAN_SCREEN}
          component={QuranScreen}
          options={{
            header: () => (showHeader ? <QuranPageHeader /> : null),
          }}
        />
        <Stack.Screen
          name={SCREENS.SETTINGS_SCREEN}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
