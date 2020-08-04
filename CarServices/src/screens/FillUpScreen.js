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
import { FillUpsCard } from "../components/FillUpsCard";
import PageLoader from "../components/PageLoader";
import { TextInput, Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import CarPicker from "../components/CarPicker";
import ajax from "../services/FillupServices";
import ajax2 from "../services/CarServices";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

function AddFillUpScreen({ route, navigation }) {
  const { user_id } = route.params;
  const [car_id, setCarId] = useState(null);
  const [maxOdo, setMaxOdo] = useState(0);
  const [errors, setErrors] = useState({
    odoError: false,
    qtyError: false,
    priceError: false
  })
  const defaultDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  const [fillup, setFillup] = useState({
    fill_id: null,
    fill_date: defaultDate,
    car_id: null,
    user_id,
    odometer: null,
    quantity: null,
    price: null,
    totalcost: null,
    fillingstation: null,
    notes: null,
  });

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const handleChangedCar = (car_id) => {
    setCarId(data.id);
    setFillup({
      ...fillup,
      car_id: data.id,
    });
  };

  const getDefaultCar = async () => {
    let data = await ajax2.getDefaultCar(user_id);
    setCarId(data.id);
    setFillup({
      ...fillup,
      car_id: data.id,
    });
    getMaxOdo();
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
      setFillup({
        ...fillup,
        fill_date: newDate,
      });
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const handleSave = async () => {
    //console.log(fillup);

    let data = await ajax.createFillUp(fillup);

    navigation.navigate("Home", {
      user_id,
    });
  };

  const getMaxOdo = async () => {
    if (car_id) {
      let data = await ajax.getMaxOdomByCar(car_id);
      console.log(data);
      if (data) {
        setMaxOdo(data);
      }
    }
  };

  useEffect(() => {
    getDefaultCar();
  }, []);

  useEffect(() => {
    getMaxOdo();
  }, [car_id]);

  return (
    <>
      <ScreenHeader
        title="Add Fill Up"
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
                  {moment(new Date(fillup.fill_date)).format("DD MMM YYYY")}
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
                  label="Odometer"
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
                  value={fillup.odometer}
                  onChangeText={(odometer) =>
                    setFillup({ ...fillup, odometer })
                  }
                  keyboardType={"numeric"}
                />
                <Text style={[styles.title2]}>Km</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <TextInput
                  label="Quantity"
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
                  value={fillup.quantity}
                  onChangeText={(quantity) =>
                    setFillup({ ...fillup, quantity })
                  }
                  keyboardType={"numeric"}
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
                  label="Price/Ltr"
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
                  value={fillup.price}
                  onChangeText={(price) =>
                    setFillup({
                      ...fillup,
                      price,
                      totalcost: price * fillup.quantity,
                    })
                  }
                  keyboardType={"numeric"}
                />
                <Text style={styles.title2}>LL</Text>
              </View>

              <View style={{ flexDirection: "column", paddingTop: 5 }}>
                <Text style={[styles.title, { height: 20 }]}>Total Cost</Text>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text
                    style={[
                      styles.paragraphBorder,
                      { color: Theme.COLORS.STEELBLUE, paddingBottom: 5 },
                    ]}
                  >
                    {fillup.totalcost}
                  </Text>
                  <Text style={styles.title2}>LL</Text>
                </View>
              </View>
            </View>

            <View style={{ paddingBottom: 30 }}>
              <TextInput
                label="Filling Station"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: "transparent",
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={{
                  width: width * 0.9,
                  backgroundColor: Theme.COLORS.WHITE,
                  height: 60,
                  fontSize: 14,
                }}
                value={fillup.fillingstation}
                onChangeText={(fillingstation) =>
                  setFillup({ ...fillup, fillingstation })
                }
              />
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
                value={fillup.notes}
                onChangeText={(notes) => setFillup({ ...fillup, notes })}
                multiline
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

function FillUpScreen({ route, navigation }) {
  const { user_id } = route.params;
  const [car_id, setCarId] = useState(null);
  const [fillups, setFillups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllFillUps = async () => {
    if (car_id) {
      let data = await ajax.getFillupByCar(car_id);
      if (data) {
        setFillups(data);
      }
    }
    setIsLoading(false);
  };

  const getDefaultCar = async () => {
    let data = await ajax2.getDefaultCar(user_id);

    setCarId(data.id);
  };

  const handleChangedCar = (car_id) => {
    setCarId(car_id);
    getAllFillUps();
  };

  const editFillUp = (id) => {
    navigation.navigate("Edit Fill Up", { fill_id: id });
  };

  useEffect(() => {
    getDefaultCar();
    getAllFillUps();
  }, []);

  useEffect(() => {
    getAllFillUps();
  }, [car_id]);

  return (
    <>
      <ScreenHeader title="Fill Ups" />
      <CarPicker
        user_id={user_id}
        car_id={car_id}
        handleChangedCar={handleChangedCar}
      />
      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, backgroundColor: Theme.COLORS.WHITE }}
        >
          <View style={styles.fillSection}>
            <FillUpsCard fillups={fillups} editFillUp={editFillUp} />
          </View>
        </ScrollView>
      )}
    </>
  );
}

function EditFillUp({ route, navigation }) {
  const { fill_id } = route.params;
  const [showEditIcon, setEditIcon] = useState("1");
  const [showSaveIcon, setSaveIcon] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const defaultDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  const [fillup, setFillup] = useState({
    id: fill_id,
    fill_date: null,
    fillingstation: null,
    notes: null,
    odometer: 0,
    price: 0,
    quantity: 0,
    totalcost: 0,
    kml_number: 0,
    distanceInKm: 0,
  });

  const getFillup = async () => {
    let data = await ajax.getFillUpById(fill_id);
    setFillup({
      id: fill_id,
      fill_date: data.fill_date,
      fillingstation: data.fillingstation,
      notes: data.notes,
      odometer: "" + data.odometer,
      price: "" + data.price,
      quantity: "" + data.quantity,
      totalcost: data.totalcost,
      kml_number: data.kml_number,
      distanceInKm: data.distanceInKm,
    });
  };

  const handleEdit = () => {
    setEditIcon(0);
    setSaveIcon("1");
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
      setFillup({
        ...fillup,
        fill_date: newDate,
      });
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  useEffect(() => {
    getFillup();
  }, []);

  return (
    <>
      <ScreenHeader
        title="Fill Ups"
        isBack="1"
        showEditIcon={showEditIcon}
        showSaveIcon={showSaveIcon}
        handleEdit={handleEdit}
      />
      {showSaveIcon ? (
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainView}>
              <View style={{ flexDirection: "column", paddingBottom: 30 }}>
                <Text style={styles.title}>Date</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.paragraph, styles.paragraphBorder]}>
                    {moment(new Date(fillup.fill_date)).format("DD MMM YYYY")}
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
                    label="Odometer"
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
                    value={fillup.odometer}
                    onChangeText={(odometer) =>
                      setFillup({ ...fillup, odometer })
                    }
                    keyboardType={"numeric"}
                  />
                  <Text style={[styles.title2]}>Km</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <TextInput
                    label="Quantity"
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
                    value={fillup.quantity}
                    onChangeText={(quantity) =>
                      setFillup({ ...fillup, quantity })
                    }
                    keyboardType={"numeric"}
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
                    value={fillup.price}
                    label="Price/Ltr"
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
                    keyboardType="numeric"
                    onChangeText={(price) =>
                      setFillup({
                        ...fillup,
                        price,
                        totalcost: price * fillup.quantity,
                      })
                    }
                  />
                  <Text style={styles.title2}>LL</Text>
                </View>

                <View style={{ flexDirection: "column", paddingTop: 5 }}>
                  <Text style={[styles.title, { height: 20 }]}>Total Cost</Text>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text
                      style={[
                        styles.paragraphBorder,
                        { color: Theme.COLORS.STEELBLUE, paddingBottom: 5 },
                      ]}
                    >
                      {fillup.totalcost}
                    </Text>
                    <Text style={styles.title2}>LL</Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingBottom: 30 }}>
                <TextInput
                  label="Filling Station"
                  theme={{
                    colors: {
                      primary: Theme.COLORS.STEELBLUE,
                      underlineColor: "transparent",
                      text: Theme.COLORS.STEELBLUE,
                    },
                  }}
                  style={{
                    width: width * 0.9,
                    backgroundColor: Theme.COLORS.WHITE,
                    height: 60,
                    fontSize: 14,
                  }}
                  value={fillup.fillingstation}
                  onChangeText={(fillingstation) =>
                    setFillup({ ...fillup, fillingstation })
                  }
                />
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
                  value={fillup.notes}
                  onChangeText={(notes) => setFillup({ ...fillup, notes })}
                  multiline
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View style={{ backgroundColor: Theme.COLORS.WHITE, height: height }}>
          <View style={styles.editSection}>
            <Text style={styles.showText}>Date</Text>
            <Text style={styles.showText}>
              {moment(new Date(fillup.fill_date)).format("DD MMM YYYY")}
            </Text>
          </View>
          <Divider />
          <View style={styles.editSection}>
            <Text style={styles.showText}>Odometer</Text>
            <Text style={styles.showText}>{fillup.odometer + " km"}</Text>
          </View>
          <Divider />
          <View style={styles.editSection}>
            <Text style={styles.showText}>Distance</Text>
            <Text style={styles.showText}>{fillup.distanceInKm + " km"}</Text>
          </View>
          <Divider />
          <View style={styles.editSection}>
            <Text style={styles.showText}>Efficiency</Text>
            <Text style={styles.showText}>{fillup.kml_number + " kpl"}</Text>
          </View>
          <Divider />
          <View style={styles.editSection}>
            <Text style={styles.showText}>Quantity</Text>
            <Text style={styles.showText}>{fillup.quantity + " Ltr"}</Text>
          </View>
          <Divider />
          <View style={styles.editSection}>
            <Text style={styles.showText}>Price/Ltr</Text>
            <Text style={styles.showText}>{fillup.price + " LL"}</Text>
          </View>
          <Divider />
          <View style={styles.editSection}>
            <Text style={styles.showText}>Total Cost</Text>
            <Text style={styles.showText}>{fillup.totalcost + " LL"}</Text>
          </View>
          <Divider />
          <View style={styles.editSection}>
            <Text style={styles.showText}>Filling Station</Text>
            <Text style={styles.showText}>{fillup.fillingstation}</Text>
          </View>
          <Divider />
        </View>
      )}
    </>
  );
}

export default { AddFillUpScreen, FillUpScreen, EditFillUp };

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: 30,
    paddingHorizontal: 15,
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
  fillSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Theme.COLORS.WHITE,
  },
  editSection: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  showText: {
    color: Theme.COLORS.STEELBLUE,
    fontSize: 16,
    width: (width * 0.9) / 2,
  },
});
