import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../redux/actions/themeActions';
import {State} from '../redux/store';
import {systemNavigationBarService} from '../services/systemNavigationBarService';
import useThemeColor from './useTheme';

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const [themeColorStyle, themeColors] = useThemeColor();

  const {isDarkTheme} = useSelector((state: State) => state.theme);

  useEffect(() => {
    // todo: investigate why doesn't work in toggleTheme
    changeNavigationAndBarColor();
  }, [isDarkTheme]);

  const toggleTheme = () => {
    dispatch(setTheme(!isDarkTheme));
    // changeNavigationAndBarColor(); // todo: investigate why doesn't work here
  };

  const changeNavigationAndBarColor = () => {
    systemNavigationBarService.setNavigationAndBarColor(
      themeColors.backgroundPrimary,
      isDarkTheme,
    );
  };

  return (
    <View>
      {/* <Switch value={isDarkTheme} onValueChange={toggleTheme} /> */}
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={isDarkTheme ? 'sunny-outline' : 'moon-outline'}
          size={24}
          style={themeColorStyle.colorPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};
