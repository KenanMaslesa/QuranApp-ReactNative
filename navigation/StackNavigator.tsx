import React, {useEffect, useState} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import QuranScreen from '../screens/QuranScreen';
import TopTabsNavigator from './TopTabsNavigator';
import QuranPageHeader from '../components/QuranPageHeader';
import SplashScreen from '../components/SplashScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [appIsLoading, setAppIsLoading] = useState(true);

  useEffect(() => {
    setAppIsLoading(false);
  }, []);

  if (appIsLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="TopTabsNavigator"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
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
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
