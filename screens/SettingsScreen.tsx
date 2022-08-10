import React from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';
import {
  CHANNELS,
  NotificationRepeatType,
  NotificationService,
} from '../services/notifications';

const SettingsScreen = () => {
  const showNotification = () => {
    NotificationService.showNotification(
      CHANNELS.Quran.channelId,
      'Simple notification',
      'Simple notification Message',
    );
  };

  const scheduleLocalNotification = () => {
    NotificationService.scheduleLocalNotification(
      CHANNELS.Quran.channelId,
      'Večernji zikr 🌙',
      'Vrijeme je za večernji zikr 17:10',
      NotificationRepeatType.DAY,
      1,
      17,
      10,
    );

    NotificationService.scheduleLocalNotification(
      CHANNELS.Quran.channelId,
      'Jutarnji zikr 🌞',
      'Vrijeme je za jutarnji zikr 05:00',
      NotificationRepeatType.DAY,
      1,
      5,
      0,
    );
  };

  const cancelAllLocalNotifications = () => {
    NotificationService.cancelAllLocalNotifications();
  };

  return (
    <View>
      <Text style={styles.button} onPress={() => showNotification()}>show notification</Text>
      <Text style={styles.button} onPress={() => scheduleLocalNotification()}>
        schedule notification
      </Text>
      <Text style={styles.button} onPress={() => cancelAllLocalNotifications()}>cancel All Local Notifications</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    backgroundColor: 'blue',
    color: 'white',
    padding: 20,
    textAlign: 'center',
    borderRadius: 30,
  },
});
