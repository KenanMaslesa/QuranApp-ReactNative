import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {State} from '../redux/store';
import {useSelector} from 'react-redux';

const QuranPageHeader = () => {
  const navigation = useNavigation();
  const showHeader = useSelector((state: State) => state.header.showHeader);

  return (
    <Animated.View style={{...styles.header, top: showHeader ? 0 : -100}}>
      <Text
        onPress={() => {
          navigation.goBack();
        }}>
        -----
      </Text>
    </Animated.View>
  );
};

export default QuranPageHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'gray',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    padding: 10,
    height: 55,
  },
});
