import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import IdleTimerManager from 'react-native-idle-timer';

const App = () => {
  IdleTimerManager.setIdleTimerDisabled(true); // prevent screen sleep

  return (
    <NavigationContainer onReady={() => SplashScreen.hide()}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
