import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import CarPicker from "../components/CarPicker";
import ajax from "../services/FillupServices";
import ajax2 from "../services/CarServices";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

function ExpenseScreen({ route, navigation }) {
  const { user_id } = route.params;
  const [car_id, setCarId] = useState(null);

  const defaultDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  const [expense, setExpense] = useState({
    expense_id: null,
    expense_date: defaultDate,
    car_id: null,
    user_id,
    expense_title: null,
    expense_vendor: null,
    cost: null,
    notes: null,
  });

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const handleChangedCar = (car_id) => {
    setCarId(data.id);
    setExpense({
      ...expense,
      car_id: data.id,
    });
  };

  const getDefaultCar = async () => {
    let data = await ajax2.getDefaultCar(user_id);
    setCarId(data.id);
    setExpense({
      ...expense,
      car_id: data.id,
    });
  };

  const onChangeDate = (selectedDate) => {
    let currentDate = selectedDate || null;
    let newDate = null;
    setShowDate(false);
    if (currentDate == null) setDate(date);
    else {
      currentDate = new Date(currentDate.nativeEvent.timestamp);
      newDate =
        currentDate.getFullYear() +
        "-" +
        String(currentDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(currentDate.getDate()).padStart(2, "0");
      setExpense({
        ...expense,
        expense_date: newDate,
      });
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const handleSave = async () => {
    console.log(expense);

    // let data = await ajax.createFillUp(fillup);
    // console.log(data);
    // navigation.navigate("Reminders", {
    //   user_id,
    // });
  };
  useEffect(() => {
    getDefaultCar();
  }, []);

  return (
    <>
      <ScreenHeader
        title="Add Expense"
        showSaveIcon="1"
        handleSave={handleSave}
      />
      <CarPicker
        user_id={user_id}
        car_id={car_id}
        handleChangedCar={handleChangedCar}
      />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <View style={{ flexDirection: "column", paddingBottom: 30 }}>
              <Text style={styles.title}>Date</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.paragraph, styles.paragraphBorder]}>
                  {moment(new Date(expense.expense_date)).format("DD MMM YYYY")}
                </Text>
                <FontAwesome
                  name="calendar"
                  size={16}
                  color={Theme.COLORS.GRADIENT_END}
                  onPress={showDatepicker}
                />
                {showDate && (
                  <DateTimePicker
                    mode="date"
                    display="calendar"
                    value={date}
                    onChange={(date) => onChangeDate(date)}
                  />
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 30,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <TextInput
                  label="Expense"
                  theme={{
                    colors: {
                      primary: Theme.COLORS.STEELBLUE,
                      underlineColor: Theme.COLORS.STEELBLUE,
                      text: Theme.COLORS.STEELBLUE,
                    },
                  }}
                  style={{
                    width: 100,
                    backgroundColor: Theme.COLORS.WHITE,
                    height: 50,
                    fontSize: 14,
                  }}
                  value={expense.expense_title}
                  onChangeText={(expense_title) =>
                    setExpense({ ...expense, expense_title })
                  }
                />
                <Text style={[styles.title2]}>Km</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <TextInput
                  label="Vendor"
                  theme={{
                    colors: {
                      primary: Theme.COLORS.STEELBLUE,
                      underlineColor: Theme.COLORS.STEELBLUE,
                      text: Theme.COLORS.STEELBLUE,
                    },
                  }}
                  style={{
                    width: 100,
                    backgroundColor: Theme.COLORS.WHITE,
                    height: 50,
                    fontSize: 14,
                  }}
                  value={expense.expense_vendor}
                  onChangeText={(expense_vendor) =>
                    setExpense({ ...expense, expense_vendor })
                  }
                />
                <Text style={[styles.title2]}>Ltr</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 30,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <TextInput
                  label="Total Cost"
                  theme={{
                    colors: {
                      primary: Theme.COLORS.STEELBLUE,
                      underlineColor: Theme.COLORS.STEELBLUE,
                      text: Theme.COLORS.STEELBLUE,
                    },
                  }}
                  style={{
                    width: 100,
                    backgroundColor: Theme.COLORS.WHITE,
                    height: 50,
                    fontSize: 14,
                  }}
                  value={expense.cost}
                  onChangeText={(cost) =>
                    setExpense({
                      ...expense,
                      cost,
                    })
                  }
                  keyboardType={"numeric"}
                />
                <Text style={styles.title2}>LL</Text>
              </View>
            </View>

            <View style={{ paddingBottom: 30 }}>
              <TextInput
                label="Notes"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={{
                  width: width * 0.9,
                  backgroundColor: Theme.COLORS.WHITE,
                  height: 80,
                  fontSize: 14,
                }}
                value={expense.notes}
                onChangeText={(notes) => setExpense({ ...expense, notes })}
                multiline
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default ExpenseScreen;

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Theme.COLORS.WHITE,
    height: height,
  },
  title: {
    fontSize: 14,
    color: Theme.COLORS.GRAYTITLE,
    paddingBottom: 5,
  },
  title2: {
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE,
  },
  paragraph: {
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE,
  },
  paragraphBorder: {
    paddingLeft: 10,
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
  },
});
