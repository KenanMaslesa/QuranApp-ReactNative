import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SuraScreen from '../screens/SuraScreen';
import JuzScreen from '../screens/JuzScreen';
import BookmarkScreen from '../screens/BookmarkScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Sura"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {fontSize: 14},
        tabBarStyle: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="Sura"
        component={SuraScreen}
        options={{tabBarLabel: 'Sura'}}
      />
      <Tab.Screen
        name="Juz"
        component={JuzScreen}
        options={{tabBarLabel: 'Juz'}}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{tabBarLabel: 'Bookmark'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabsNavigator;
