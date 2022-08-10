import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SuraScreen from '../screens/SuraScreen';
import JuzScreen from '../screens/JuzScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import HomeHeader from '../components/HomeHeader';
import {SCREENS} from '../screens/constants';

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <>
      <HomeHeader />
      <Tab.Navigator
        initialRouteName={SCREENS.SURA_SCREEN}
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarLabelStyle: {fontSize: 14},
          tabBarStyle: {backgroundColor: 'white'},
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
