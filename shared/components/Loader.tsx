import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import useThemeColor from '../../style/useTheme';

const Loader = () => {
  const [themeColorStyle, themeColors] = useThemeColor();

  return (
    <View style={[styles.container, themeColorStyle.backgroundPrimary]}>
      <ActivityIndicator color={themeColors.colorSecondary} size={50} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
});
