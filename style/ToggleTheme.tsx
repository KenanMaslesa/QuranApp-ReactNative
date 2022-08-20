import * as React from 'react';
import {Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../redux/actions/themeActions';
import {State} from '../redux/store';

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const {isDarkTheme} = useSelector((state: State) => state.theme);

  const toggleScheme = () => {
    dispatch(setTheme(!isDarkTheme));
  };

  return <Switch value={isDarkTheme} onValueChange={toggleScheme} />;
};
