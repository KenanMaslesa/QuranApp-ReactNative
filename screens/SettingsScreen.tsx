import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PushNotification, {
  PushNotificationScheduledLocalObject,
} from 'react-native-push-notification';
import {
  CHANNELS,
  NotificationRepeatType,
  NotificationService,
} from '../services/notifications';

const SettingsScreen = () => {
  const [scheduledNotifications, setScheduledNotifications] = useState<
    PushNotificationScheduledLocalObject[]
  >([]);

  useEffect(() => {
    getScheduledNotifications();
  }, []);

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
      'Vrijeme je za večernji zikr',
      NotificationRepeatType.DAY,
      1, // 2 - every two seconds/minutes/hours/days
      17,
      0,
    );
    NotificationService.scheduleLocalNotification(
      CHANNELS.Quran.channelId,
      'Jutarnji zikr 🌞',
      'Vrijeme je za jutarnji zikr',
      NotificationRepeatType.DAY,
      1, // 2 - every two seconds/minutes/hours/days
      8,
      50,
    );
  };

  const scheduleLocalNotificationEvery5Minutes = () => {
    NotificationService.scheduleLocalNotification(
      CHANNELS.Quran.channelId,
      'Večernji zikr 🌙',
      'Vrijeme je za večernji zikr',
      NotificationRepeatType.MINUTE,
      5,
      new Date().getHours(),
      new Date().getMinutes() + 5,
    );
  };

  const cancelAllLocalNotifications = () => {
    NotificationService.cancelAllLocalNotifications();
  };

  const getScheduledNotifications = () => {
    PushNotification.getScheduledLocalNotifications(
      (list: PushNotificationScheduledLocalObject[]) => {
        setScheduledNotifications(list);
      },
    );
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.button} onPress={() => showNotification()}>
          show notification
        </Text>
        <Text style={styles.button} onPress={() => scheduleLocalNotification()}>
          schedule morning and evening dhikr notification (08:50 - 17:00)
        </Text>
        <Text
          style={styles.button}
          onPress={() => scheduleLocalNotificationEvery5Minutes()}>
          schedule notification every 5 minutes
        </Text>
        <Text
          style={styles.button}
          onPress={() => cancelAllLocalNotifications()}>
          cancel All Local Notifications
        </Text>

        <Text style={styles.button} onPress={() => getScheduledNotifications()}>
          getScheduledNotifications
        </Text>
        {scheduledNotifications.map(notification => (
          <View style={styles.notification} key={notification.id}>
            <Text>
              {notification.title} - {notification.message}
            </Text>
            <Text>
              {notification.date.toDateString()}---
              {notification.date.toLocaleTimeString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
  notification: {
    padding: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
});
