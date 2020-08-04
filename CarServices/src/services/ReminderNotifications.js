import { AsyncStorage, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import ajax from "./ReminderServices";
import { DrawerContentScrollView } from "@react-navigation/drawer";

class ReminderNotifications {
  constructor() {
    this.sendReminder();
    // this.user_id = null;
  }

  sendReminder = async () => {
    const user_id = (await AsyncStorage.getItem("user_id")) || null;
    Notifications.cancelAllScheduledNotificationsAsync();

    if (user_id != null) {
      const reminders = (await ajax.getNotifyRemindersByUser(user_id)) || [];
      console.log(reminders);

      let currentDate =
        new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
      if (reminders.length > 0) {
        reminders.map((reminder) => {
          let dueService_date =
            new Date(reminder.dueService_date).getFullYear() +
            new Date(reminder.dueService_date).getMonth() +
            new Date(reminder.dueService_date).getDate();

          // if (dueService_date == currentDate) {
          let localNotification = {
            title: reminder.name,
            body: reminder.name,
          };
          Keyboard.dismiss();
          let schedulingOptions = {
            time: new Date(dueService_date),
            repeat: "day",
          };
          Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          );
          console.log(reminder.name);
          // }
        });
      }
    }
  };
}

export default new ReminderNotifications();
