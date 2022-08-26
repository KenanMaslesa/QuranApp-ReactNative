import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import StackNavigator from './navigation/StackNavigator';
import IdleTimerManager from 'react-native-idle-timer';
import {useDispatch} from 'react-redux';
import {getTheme} from './redux/actions/themeActions';
import {systemNavigationBarService} from './services/systemNavigationBarService';
import {Appearance} from 'react-native';

const App = () => {
  const dispatch = useDispatch();
  const [preferedTheme, setPreferedTheme] = useState(
    Appearance.getColorScheme(),
  );

  useEffect(() => {
    dispatch(getTheme(preferedTheme));
    systemNavigationBarService.stickyImmersive();
    IdleTimerManager.setIdleTimerDisabled(true); // prevent screen sleep

    const preferedThemeSub = Appearance.addChangeListener(() => {
      setPreferedTheme(Appearance.getColorScheme());
    });

    return () => {
      preferedThemeSub.remove();
    };
  }, [dispatch, preferedTheme]);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
