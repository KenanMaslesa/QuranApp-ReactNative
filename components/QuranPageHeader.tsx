import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

const QuranPageHeader = () => {
  const navigation = useNavigation();
  return (
    <Animated.View style={styles.header}>
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
    height: 65,
    backgroundColor: 'gray',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    padding: 10,
  },
});
