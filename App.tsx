import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import IdleTimerManager from 'react-native-idle-timer';
import {useDispatch} from 'react-redux';
import {getTheme} from './redux/actions/themeActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    IdleTimerManager.setIdleTimerDisabled(true); // prevent screen sleep
    dispatch(getTheme());
  }, []);

  return (
    <NavigationContainer onReady={() => SplashScreen.hide()}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
