import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quran</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  text: {
    color: 'white',
    fontSize: 50,
  },
});
