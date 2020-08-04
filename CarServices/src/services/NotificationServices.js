import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const sendPushNotification = async (
  receiver,
  notificationTitle,
  notificationBody
) => {
  const message = {
    to: receiver, //"ExponentPushToken[U9Ir_lMworjIk7c4HC4UFO]",
    sound: "default",
    title: notificationTitle,
    body: notificationBody,
    data: { data: "goes here" },
    _displayInForeground: true,
  };
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export default { sendPushNotification };
