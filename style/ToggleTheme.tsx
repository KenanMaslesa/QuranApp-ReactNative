import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../redux/actions/themeActions';
import {State} from '../redux/store';
import {navigationBarService} from '../services/navigationBarService';
import useThemeColor from './useTheme';

export const ToggleTheme = () => {
  const dispatch = useDispatch();
  const [themeColorStyle, themeColors] = useThemeColor();

  const {isDarkTheme} = useSelector((state: State) => state.theme);

  useEffect(() => {
    // todo: investigate why don'y work in toggleTheme
    navigationBarService.setNavigationColor(
      themeColors.backgroundPrimary,
      !isDarkTheme,
    );
  }, [isDarkTheme]);

  const toggleTheme = () => {
    // navigationBarService.setNavigationColor(
    //   themeColors.backgroundPrimary,
    //   !isDarkTheme,
    // );
    dispatch(setTheme(!isDarkTheme));
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
