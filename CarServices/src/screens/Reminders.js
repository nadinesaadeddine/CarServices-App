import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Picker,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { TextInput, RadioButton, Divider } from "react-native-paper";
import { ScreenHeader } from "../components/ScreenHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ProgressBar } from "react-native-multicolor-progress-bar";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import ReminderNotifications from "../services/ReminderNotifications";
import ajax from "../services/ReminderServices";
import ajax2 from "../services/CarServices";
import PageLoader from "../components/PageLoader";
import CarPicker from "../components/CarPicker";
import CarHeader from "../components/CarHeader";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";
import {
  MaterialIcons,
  Entypo,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

function ReminderPopUp(props) {
  const [name, setName] = useState("");

  const getReminderById = async () => {
    //console.log(props.reminder_id);
    if (props.reminder_id != null) {
      let data = await ajax.getReminderById(props.reminder_id);
      setName(data.name);
    }
  };

  const handleSave = async () => {
    let bodyReq = { user_id: props.user_id, car_id: props.car_id, name };
    let data = await ajax.createReminder(bodyReq);
    props.navigation.replace("Reminders");
  };

  const handleUpdate = async () => {
    let bodyReq = { reminder_id: props.reminder_id, name, updateName: 1 };
    let data = await ajax.updateReminder(bodyReq);
    props.navigation.replace("Reminders");
  };
  const handleDelete = async () => {
    let data = await ajax.deleteReminder(props.reminder_id);
    props.navigation.replace("Reminders");
  };

  useEffect(() => {
    getReminderById();
  }, [props.reminder_id]);
  return (
    <Modal
      isVisible={props.isModalVisible}
      animationType="slide"
      style={styles.modalContainer}
    >
      <View style={styles.modalView}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Theme.COLORS.STEELBLUE,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.modalTitle}>Add Reminder</Text>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <TextInput
            label="Reminder Name"
            theme={{
              colors: {
                primary: Theme.COLORS.STEELBLUE,
                underlineColor: Theme.COLORS.STEELBLUE,
              },
            }}
            style={styles.textInput}
            value={name}
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.buttonSection}>
          <View>
            {props.reminder_id != null && (
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.buttonIcon}>DELETE</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity onPress={props.handleHideModal}>
              <Text style={styles.buttonIcon}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View>
            {props.reminder_id == null ? (
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.buttonIcon}>ADD</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleUpdate}>
                <Text style={styles.buttonIcon}>UPDATE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

function SetReminder({ navigation, route }) {
  const { user_id } = route.params;
  const { car_id } = route.params;
  const { reminder_id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [reminder, setReminder] = useState({
    reminder_id,
    user_id,
    car_id,
    name: "",
    dateCounter: null,
    dateType: "day",
    dueService_date: null,
    lastService_date: null,
    reminder_on: 0,
    updateName: 0,
  });

  const onChange = (selectedDate) => {
    let currentDate = selectedDate || null;
    let newDate = null;
    setShow(false);
    if (currentDate == null) setDate(date);
    else {
      currentDate = new Date(currentDate.nativeEvent.timestamp);
      newDate =
        currentDate.getFullYear() +
        "-" +
        String(currentDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(currentDate.getDate()).padStart(2, "0");
      setDate(currentDate);
    }
    let dueDate;
    if (newDate == null) dueDate = null;
    else dueDate = calculateDueDate(currentDate, reminder.dateCounter);
    setReminder({
      ...reminder,
      lastService_date: newDate,
      dueService_date: dueDate,
    });
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const calculateDueDate = (ndate, dateCounter) => {
    let lastDate = new Date(ndate);
    let dueDate = null;

    if (reminder.dateType == "day") {
      dueDate = lastDate.setDate(lastDate.getDate() + parseInt(dateCounter));
      dueDate = new Date(dueDate);

      dueDate =
        dueDate.getFullYear() +
        "-" +
        String(dueDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dueDate.getDate()).padStart(2, "0");
    }

    return dueDate;
  };

  const handleSave = async () => {
    let data = await ajax.updateReminder(reminder);
    navigation.navigate("Reminders", {
      user_id,
    });
  };

  const getReminder = async () => {
    let data = await ajax.getReminderById(reminder_id);
    //console.log(data);
    setReminder({
      ...reminder,
      reminder_id,
      car_id,
      name: data.name,
      dateCounter: data.dateCounter == null ? null : "" + data.dateCounter,
      dateType: data.dateType == null ? "day" : data.dateType,
      dueService_date: data.dueService_date,
      lastService_date: data.lastService_date,
      reminder_on: data.reminder_on,
      updateName: 0,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getReminder();
  }, []);

  return (
    <>
      <ScreenHeader
        title="Reminders"
        showSaveIcon="1"
        isBack="1"
        handleSave={handleSave}
      />
      <CarHeader car_id={car_id} />
      <Divider />
      {isLoading ? (
        <PageLoader />
      ) : (
        <View style={{ backgroundColor: Theme.COLORS.WHITE, flex: 1 }}>
          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <Text style={styles.title}>{reminder.name}</Text>
          </View>
          <View style={styles.setSection}>
            <Text style={styles.title}>Reminder Every:</Text>
            <View style={styles.subSection}>
              <RadioButton
                value="1"
                status={reminder.reminder_on == "1" ? "checked" : "unchecked"}
                color={Theme.COLORS.STEELBLUE}
                onPress={() => setReminder({ ...reminder, reminder_on: 1 })}
              />
              <TextInput
                value={reminder.dateCounter}
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={styles.numeric}
                keyboardType={"numeric"}
                onChangeText={(dateCounter) =>
                  setReminder({
                    ...reminder,
                    dateCounter,
                    dueService_date: calculateDueDate(
                      reminder.lastService_date,
                      dateCounter
                    ),
                  })
                }
              />
              <Picker
                style={styles.reminderPicker}
                selectedValue={reminder.dateType}
                onValueChange={(itemValue) =>
                  setReminder({ ...reminder, dateType: itemValue })
                }
              >
                <Picker.Item label="Days" value="day" />
                <Picker.Item label="Months" value="month" />
                <Picker.Item label="Years" value="year" />
              </Picker>
            </View>
            <View style={styles.subSection}>
              <RadioButton
                value="0"
                status={reminder.reminder_on == "0" ? "checked" : "unchecked"}
                color={Theme.COLORS.STEELBLUE}
                onPress={() =>
                  setReminder({
                    ...reminder,
                    reminder_on: 0,
                    lastService_date: null,
                    dueService_date: null,
                    dateCounter: null,
                    dateType: null,
                  })
                }
              />
              <Text style={styles.noReminder}>No Reminder</Text>
            </View>
          </View>
          <Divider />
          <View style={styles.setSection}>
            <Text style={styles.title}>Last Service:</Text>
            <View style={styles.dateSection}>
              <Text
                style={{ fontSize: 14, color: "#C0C0C0", paddingBottom: 10 }}
              >
                Date
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.reminderDate}>
                  {reminder.lastService_date == null
                    ? "n/a"
                    : moment(new Date(reminder.lastService_date)).format(
                        "DD-MM-YYYY"
                      )}
                </Text>
                <FontAwesome
                  name="calendar"
                  size={16}
                  color={Theme.COLORS.GRADIENT_END}
                  onPress={showDatepicker}
                />
                {show && (
                  <DateTimePicker
                    mode="date"
                    display="calendar"
                    value={date}
                    onChange={(date) => onChange(date)}
                  />
                )}
              </View>
            </View>
          </View>
          <Divider />
          <View style={styles.setSection}>
            <Text style={styles.title}>Due Service:</Text>
            <View style={styles.dateSection}>
              <Text
                style={{ fontSize: 14, color: "#C0C0C0", paddingBottom: 10 }}
              >
                Date
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.reminderDate}>
                  {reminder.dueService_date == null
                    ? "n/a"
                    : moment(new Date(reminder.dueService_date)).format(
                        "DD-MM-YYYY"
                      )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

function Reminders({ navigation, route }) {
  const { user_id } = route.params;
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [car_id, setCarId] = useState(null);
  const [reminder_id, setReminderId] = useState(null);

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleHideModal = () => {
    setReminderId(null);
    setModalVisible(false);
  };

  const getAllReminders = async () => {
    let data = await ajax.getRemindersByUser(car_id);
    setReminders(data);
    setIsLoading(false);
  };

  const getDefaultCar = async () => {
    let data = await ajax2.getDefaultCar(user_id);
    setCarId(data.id);
  };

  const handleChangedCar = (car_id) => {
    setCarId(car_id);
    setIsLoading(true);
    getAllReminders();
    setIsLoading(false);
  };

  const handleLongPress = (id) => {
    setReminderId(id);
    setModalVisible(true);
  };

  const progressCalculation = (lastDate, dueDate) => {
    lastDate = new Date(lastDate);
    dueDate = new Date(dueDate);
    let currentDate = new Date();

    let currentDiff = currentDate.getTime() - lastDate.getTime();
    let dueDiff = dueDate.getTime() - lastDate.getTime();
    let percentage = Math.round((currentDiff * 100) / dueDiff);

    let obj = [];
    let reminingPer = 1;
    if (percentage >= 0) {
      obj.push({
        color: "#FF4500",
        value: 0.2,
        opacity: 0.1,
      });
      reminingPer = 0.8;
    }
    if (percentage > 20) {
      obj.push({
        color: "#FF4500",
        value: 0.2,
        opacity: 0.15,
      });
      reminingPer = 0.6;
    }
    if (percentage > 40) {
      obj.push({
        color: "#FF4500",
        value: 0.2,
        opacity: 0.2,
      });
      reminingPer = 0.4;
    }
    if (percentage > 60) {
      obj.push({
        color: "#FF4500",
        value: 0.2,
        opacity: 0.25,
      });
      reminingPer = 0.2;
    }
    if (percentage > 80) {
      obj.push({
        color: "#FF4500",
        value: 0.2,
        opacity: 0.3,
      });
      reminingPer = 0;
    }
    if (reminingPer > 0) {
      obj.push({
        color: "#DCDCDC",
        value: reminingPer,
        opacity: 0.1,
      });
    }

    return obj;
  };

  // useEffect(() => {
  //   getAllReminders();
  //   getDefaultCar();
  // }, []);
  useEffect(() => {
    getAllReminders();
    getDefaultCar();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllReminders();
    }, [car_id])
  );

  return (
    <>
      <ScreenHeader title="Reminders" showAddIcon="1" handleAdd={handleAdd} />
      <CarPicker
        user_id={user_id}
        car_id={car_id}
        handleChangedCar={handleChangedCar}
      />

      <View style={{ flex: 1, backgroundColor: Theme.COLORS.WHITE }}>
        {isLoading ? (
          <PageLoader />
        ) : (
          reminders.length > 0 &&
          reminders.map((reminder) => {
            return (
              <TouchableOpacity
                key={reminder.id}
                onLongPress={() => handleLongPress(reminder.id)}
                onPress={() =>
                  navigation.navigate("Set Reminder", {
                    user_id,
                    car_id,
                    reminder_id: reminder.id,
                  })
                }
              >
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    backgroundColor: Theme.COLORS.WHITE,
                  }}
                >
                  <Text style={styles.modalTitle}>{reminder.name}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={styles.textDetail}>
                      Last Service:
                      {reminder.lastService_date == null
                        ? "n/a"
                        : moment(new Date(reminder.lastService_date)).format(
                            "DD MMM YYYY"
                          )}
                    </Text>

                    <Text style={styles.textDetail}>
                      Due:
                      {reminder.dueService_date == null
                        ? "n/a"
                        : moment(new Date(reminder.dueService_date)).format(
                            "DD MMM YYYY"
                          )}
                    </Text>
                  </View>
                </View>

                <ProgressBar
                  arrayOfProgressObjects={progressCalculation(
                    reminder.lastService_date,
                    reminder.dueService_date
                  )}
                />
              </TouchableOpacity>
            );
          })
        )}
        <ReminderPopUp
          user_id={user_id}
          car_id={car_id}
          reminder_id={reminder_id}
          isModalVisible={isModalVisible}
          handleHideModal={handleHideModal}
          navigation={navigation}
        />
      </View>
    </>
  );
}

export default { Reminders, SetReminder };

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: Theme.COLORS.WHITE,
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.COLORS.STEELBLUE,
  },
  textInput: {
    width: width * 0.9,
    paddingLeft: 2,
    backgroundColor: Theme.COLORS.WHITE,
    fontSize: 14,
    height: 60,
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  buttonIcon: {
    fontSize: 15,
    fontWeight: "bold",
    color: Theme.COLORS.STEELBLUE,
  },

  textDetail: {
    color: Theme.COLORS.GRADIENT_END,
    fontSize: 12,
  },
  setSection: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  subSection: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Theme.COLORS.STEELBLUE,
  },
  numeric: {
    width: 100,
    backgroundColor: Theme.COLORS.WHITE,
    height: 20,
    fontSize: 14,
  },
  reminderPicker: {
    width: 100,
    alignItems: "center",
    color: Theme.COLORS.STEELBLUE,
    fontWeight: "700",
    fontSize: 14,
  },
  noReminder: {
    color: Theme.COLORS.STEELBLUE,
    fontWeight: "700",
    fontSize: 14,
  },
  reminderDate: {
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE,
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 1,
    width: 100,
    alignItems: "center",
    alignContent: "center",
  },
  dateSection: {
    flexDirection: "column",
    paddingVertical: 15,
    paddingLeft: 10,
  },
});
