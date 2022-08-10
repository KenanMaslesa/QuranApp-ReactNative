import PushNotification from 'react-native-push-notification';

interface NotificationChannel {
  channelId: string;
  channelName: string;
}

export enum NotificationRepeatType {
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  TIME = 'time',
}

export const CHANNELS = {
  Quran: {
    channelName: 'Quran',
    channelId: 'Quran',
  },
};

const createChannel = (channel: NotificationChannel) => {
  PushNotification.createChannel(
    {
      channelId: channel.channelId,
      channelName: channel.channelName,
    },
    () => {
      console.log(`${channel.channelName} is created`);
    },
  );
};

const scheduleLocalNotification = (
  channelId: string,
  title: string,
  message: string,
  repeatType: NotificationRepeatType,
  repeatTime: number,
  hour: number,
  minute: number,
) => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);

  PushNotification.localNotificationSchedule({
    channelId,
    repeatType,
    repeatTime,
    title,
    message,
    date,
    allowWhileIdle: true,
  });
};

const showNotification = (
  channelId: string,
  title: string,
  message: string,
) => {
  PushNotification.localNotification({
    channelId,
    title,
    message,
  });
};

const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const NotificationService = {
  createChannel,
  scheduleLocalNotification,
  showNotification,
  cancelAllLocalNotifications,
};
