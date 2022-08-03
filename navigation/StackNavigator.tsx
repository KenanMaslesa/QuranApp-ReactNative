import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QuranScreen from '../screens/QuranScreen';
import TopTabsNavigator from './TopTabsNavigator';
import QuranPageHeader from '../components/QuranPageHeader';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TopTabsNavigator">
      <Stack.Screen
        name="TopTabsNavigator"
        component={TopTabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Quran"
        component={QuranScreen}
        options={{
          header: () => <QuranPageHeader />,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
