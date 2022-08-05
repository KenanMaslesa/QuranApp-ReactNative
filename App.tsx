import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  return (
    <NavigationContainer onReady={() => SplashScreen.hide()}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
