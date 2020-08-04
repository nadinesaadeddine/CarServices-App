import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
  Button,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";

import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import ajax from "../services/RequestServices";
import ajax2 from "../services/CarServices";
import ajax3 from "../services/ReminderServices";
import ajax4 from "../services/FillupServices";
import ajax5 from "../services/ExpenseServices";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Title, Paragraph, Divider, TextInput } from "react-native-paper";
import moment from "moment";
import { ScreenHeader } from "../components/ScreenHeader";
import { HomeCards } from "../components/HomeCards";
import Theme from "../../constants/Theme";
import CarPicker from "../components/CarPicker";
import { FillUpsCard } from "../components/FillUpsCard";
import { LineChart } from "react-native-chart-kit";

const { height, width } = Dimensions.get("screen");

function FloatingButton(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0.01));
  //const [pinStyle, setPinStyle] = useState(null);
  const navigation = props.navigation;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
    }).start();

    setIsOpen(!isOpen);
  };

  const pinStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
    ],
  };
  const pinStyle2 = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120],
        }),
      },
    ],
  };
  const pinStyle3 = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -180],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  return (
    <View style={[styles.floatingButton, props.style]}>
      <TouchableNativeFeedback>
        <Animated.View style={[styles.button, styles.secondary, pinStyle3]}>
          <MaterialCommunityIcons
            name="car-battery"
            size={24}
            color={Theme.COLORS.WHITE}
          />
        </Animated.View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => navigation.push("Add Expense")}>
        <Animated.View style={[styles.button, styles.secondary, pinStyle2]}>
          <MaterialIcons
            name="attach-money"
            size={24}
            color={Theme.COLORS.WHITE}
          />
        </Animated.View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {
          setIsOpen(false);
          navigation.push("Add Fill Up");
        }}
      >
        <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
          <MaterialCommunityIcons
            name="fuel"
            size={24}
            color={Theme.COLORS.WHITE}
          />
        </Animated.View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={() => toggleMenu()}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color="#FFF" />
        </Animated.View>
      </TouchableNativeFeedback>
    </View>
  );
}

function Home({ navigation, route }) {
  const { user_id } = route.params;
  const [services, setServices] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [fillups, setFillups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [car_id, setCarId] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  const [datasetval, setDataset] = useState([]);
  const [labelsval, setLabels] = useState([]);

  const getUserUndoneServices = async () => {
    if (car_id) {
      let data = await ajax.getPendingServicesByCar(car_id);
      setServices(data);
    }
  };

  const getReminders = async () => {
    if (car_id) {
      let data = await ajax3.getOverdueReminder(car_id);
      setReminders(data);
    }
  };

  const getDefaultCar = async () => {
    let data = await ajax2.getDefaultCar(user_id);

    setCarId(data.id);
  };

  const handleChangedCar = (car_id) => {
    setCarId(car_id);
    getReminders();
    getUserUndoneServices();
    getFillUpsByCarId();
    getExpensesByCarId();
    getTotalFuelCost();
  };

  const getFillUpsByCarId = async () => {
    if (car_id) {
      let data = await ajax4.getFillupLastThirtyDaysByCar(car_id);
      setFillups(data);

      let labels = [];
      let datavals = [];
      data.map((fill) => {
        if (fill.kml_number != null) {
          labels.push(moment(new Date(fill.fill_date)).format("DD MMM"));
          datavals.push(fill.kml_number);
        }
      });
      labels.reverse();
      datavals.reverse();
      setDataset(datavals);
      setLabels(labels);
    }
  };

  const getExpensesByCarId = async () => {
    if (car_id) {
      let data = await ajax5.getExpenseByCar(car_id);
      setExpenses(data);
    }
  };

  const getTotalFuelCost = async () => {
    if (car_id) {
      let data = await ajax4.getSumFuelLastThirtyDays(car_id);
      setTotalCost(data);
    }
  };
  const editFillUp = (id) => {
    navigation.navigate("Edit Fill Up", { fill_id: id });
  };
  useFocusEffect(
    React.useCallback(() => {
      getDefaultCar();
      getUserUndoneServices();
      getReminders();
      getFillUpsByCarId();
      getExpensesByCarId();
      getTotalFuelCost();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      getReminders();
      getUserUndoneServices();
      getFillUpsByCarId();
      getExpensesByCarId();
      getTotalFuelCost();
    }, [car_id])
  );

  const chartConfig = {
    backgroundGradientFrom: "#FAFAD2",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#FAFAD2",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(75,0,130, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    fillShadowGradientOpacity: 1,
    fillShadowGradient: "rgba(75,0,130)",
    decimalPlaces: 2,
  };

  const data = {
    labels: labelsval, //["09-Jun", "15-Jun", "22-Jun"], //
    datasets: [
      {
        data: datasetval, //[4.33, 7, 6],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  return (
    <>
      <ScreenHeader title="Home" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width }}
      >
        <CarPicker
          user_id={user_id}
          car_id={car_id}
          handleChangedCar={handleChangedCar}
        />

        <View style={{ paddingVertical: 10, paddingHorizontal: 2 }}>
          <View style={styles.mainSection}>
            <View style={styles.miniSection}>
              <View style={styles.subMiniSection}>
                <View style={[styles.roundSection, { borderColor: "#FF4500" }]}>
                  <Text style={{ fontSize: 14, color: "#FF4500" }}>
                    {services.length > 0 ? services.length : "n/a"}
                  </Text>
                </View>
                <Text style={styles.roundSectionText}>Ongoing Services</Text>
              </View>
              <View style={styles.subMiniSection}>
                <View style={[styles.roundSection, { borderColor: "#FFD700" }]}>
                  <Text style={{ fontSize: 14, color: "#FFD700" }}>
                    {reminders.length > 0 ? reminders.length : "n/a"}
                  </Text>
                </View>
                <Text style={styles.roundSectionText}>Overdue Reminders</Text>
              </View>
              <View style={styles.subMiniSection}>
                <View style={[styles.roundSection, { borderColor: "#1E90FF" }]}>
                  <Text style={{ fontSize: 14, color: "#1E90FF" }}>
                    {fillups.length > 0 ? fillups.length : "n/a"}
                  </Text>
                </View>
                <Text style={styles.roundSectionText}>Fill ups</Text>
                <Text style={styles.roundSectionText}>(30 days)</Text>
              </View>
              <View style={styles.subMiniSection}>
                <View style={[styles.roundSection, { borderColor: "#3CB371" }]}>
                  <Text style={{ fontSize: 12, color: "#3CB371" }}>
                    {totalCost > 0 ? totalCost : "n/a"}
                  </Text>
                </View>
                <Text style={styles.roundSectionText}>Fuel Cost</Text>
                <Text style={styles.roundSectionText}>(LL)</Text>
              </View>
            </View>
            {fillups.length > 0 && labelsval.length > 0 && (
              <View
                style={{
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LineChart
                  style={{
                    borderRadius: 16,
                  }}
                  data={data}
                  width={width * 0.8}
                  height={180}
                  verticalLabelRotation={0}
                  chartConfig={chartConfig}
                  withInnerLines={false}
                  segments={3}
                  yAxisInterval={3}
                  withDots={true}
                  fromZero={true}
                  bezier
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[styles.roundSectionText, { paddingBottom: 10 }]}
                  >
                    Kilometers Per Liter (KPL)
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            showsPagination={false}
            autoplay={false}
          >
            {services.length > 0 &&
              services.map((service) => {
                return (
                  <View key={service.id} style={styles.slide}>
                    <Card
                      style={{
                        backgroundColor: Theme.COLORS.WHITE,

                        borderColor: "#B0E0E6",
                        borderWidth: 0.5,
                      }}
                    >
                      <Card.Content
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <View>
                          <View style={{ alignItems: "center" }}>
                            <Text style={styles.mainTitle}>
                              Ongoing Services
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              paddingBottom: 10,
                            }}
                          >
                            <View style={{ paddingLeft: 20 }}>
                              <Title style={styles.itemTitle}>
                                {service.company.name}
                              </Title>
                              <View style={[styles.iconSection]}>
                                <MaterialIcons
                                  name="location-on"
                                  size={16}
                                  color="#D3D3D3"
                                />
                                <Paragraph style={styles.paragraphAddress}>
                                  {service.company.address}
                                </Paragraph>
                              </View>
                              <View style={[styles.iconSection]}>
                                <FontAwesome
                                  name="phone"
                                  size={16}
                                  color="#D3D3D3"
                                />
                                <Paragraph style={styles.paragraphAddress}>
                                  {service.company.phone_number}
                                </Paragraph>
                              </View>
                            </View>
                          </View>
                          <Divider style={{ width: width * 0.9 }} />
                          <View
                            style={{ flexDirection: "column", paddingTop: 10 }}
                          >
                            <View style={[styles.iconSection]}>
                              <Entypo
                                name="time-slot"
                                size={16}
                                color={Theme.COLORS.GRADIENT_END}
                              />

                              <Paragraph style={styles.paragraph}>
                                {moment(new Date(service.booking_date)).format(
                                  "DD MMM YYYY"
                                )}
                                {" at "}
                                {moment(
                                  service.booking_time,
                                  "HH:mm:ss"
                                ).format("h:mm a")}
                              </Paragraph>
                            </View>
                            <View style={[styles.iconSection]}>
                              <Octicons
                                name="checklist"
                                size={18}
                                color={Theme.COLORS.GRADIENT_END}
                              />
                              <Paragraph style={styles.paragraph}>
                                {service.status}
                              </Paragraph>
                            </View>
                            <View style={[styles.iconSection]}>
                              {service.service.icon_library ==
                              "MaterialCommunityIcons" ? (
                                <MaterialCommunityIcons
                                  name={service.service.service_icon}
                                  size={16}
                                  color={Theme.COLORS.GRADIENT_END}
                                />
                              ) : (
                                <Ionicons
                                  name={service.service.service_icon}
                                  size={16}
                                  color={Theme.COLORS.GRADIENT_END}
                                />
                              )}

                              <Paragraph style={styles.paragraph}>
                                {service.service.name}
                              </Paragraph>
                            </View>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </View>
                );
              })}
          </Swiper>
        </View>
        {reminders.length > 0 && (
          <View style={{ paddingVertical: 10, paddingHorizontal: 2 }}>
            <View style={styles.reminderSection}>
              <View style={{ alignItems: "center", paddingVertical: 10 }}>
                <Text style={styles.mainTitle}>Overdue Reminders</Text>
              </View>
              {reminders.map((reminder) => {
                return (
                  <View style={{ paddingVertical: 5 }}>
                    <Text style={styles.itemTitle}>{reminder.name}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingBottom: 2,
                      }}
                    >
                      <Text style={{ color: Theme.COLORS.GRADIENT_END }}>
                        {moment(new Date(reminder.dueService_date)).format(
                          "DD MMM YYYY"
                        )}
                      </Text>
                    </View>
                    <Divider style={{ width: width * 0.9 }} />
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={() => navigation.navigate("Reminders", { user_id })}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Theme.COLORS.GRADIENT_END,
                      fontWeight: "700",
                    }}
                  >
                    Show All
                  </Text>
                  <View style={{ paddingLeft: 5 }}>
                    <FontAwesome
                      name="arrow-right"
                      size={14}
                      color={Theme.COLORS.GRADIENT_END}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Swiper
          style={{ height: 350 }}
          showsButtons={false}
          showsPagination={false}
          autoplay={false}
        >
          {fillups.length > 0 && (
            <View>
              <View style={{ paddingVertical: 5, paddingHorizontal: 2 }}>
                <View style={styles.reminderSection}>
                  <View style={{ alignItems: "center", paddingVertical: 10 }}>
                    <Text style={styles.mainTitle}>Fill Ups Logs</Text>
                  </View>
                  <FillUpsCard fillups={fillups} editFillUp={editFillUp} />
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Fill Up", { user_id })}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: Theme.COLORS.GRADIENT_END,
                          fontWeight: "700",
                        }}
                      >
                        Show All
                      </Text>
                      <View style={{ paddingLeft: 5 }}>
                        <FontAwesome
                          name="arrow-right"
                          size={14}
                          color={Theme.COLORS.GRADIENT_END}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {expenses.length > 0 && (
            <View>
              <View style={{ paddingVertical: 5, paddingHorizontal: 2 }}>
                <View style={styles.reminderSection}>
                  <View style={{ alignItems: "center", paddingVertical: 10 }}>
                    <Text style={styles.mainTitle}>Expenses Logs</Text>
                  </View>
                  {expenses.map((expense) => {
                    return (
                      <View key={expense.id}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingVertical: 10,
                            alignItems: "center",
                          }}
                        >
                          <View style={styles.ExpenseIcon}>
                            <MaterialIcons
                              name="attach-money"
                              size={20}
                              color={Theme.COLORS.WHITE}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Text style={[styles.paragraph, { width: 100 }]}>
                              {moment(new Date(expense.expense_date)).format(
                                "DD MMM YYYY"
                              )}
                            </Text>
                            <Text style={[styles.paragraph, { width: 100 }]}>
                              {expense.expense_title}
                            </Text>
                            <Text style={[styles.paragraph, { width: 100 }]}>
                              {expense.cost + " LL"}
                            </Text>
                          </View>
                        </View>
                        <Divider />
                      </View>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Reminders", { user_id })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: Theme.COLORS.GRADIENT_END,
                          fontWeight: "700",
                        }}
                      >
                        Show All
                      </Text>
                      <View style={{ paddingLeft: 5 }}>
                        <FontAwesome
                          name="arrow-right"
                          size={14}
                          color={Theme.COLORS.GRADIENT_END}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Swiper>
      </ScrollView>
      <FloatingButton style={styles.addSection} navigation={navigation} />
    </>
  );
}

{
  /* <View
          style={{
            flex: 1,
            backgroundColor: Theme.COLORS.PRIMARY,
            height: 200,
            width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HomeCards />
        </View> */
}
export default Home;

const styles = StyleSheet.create({
  mainSection: {
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: "#B0E0E6",
    borderRadius: 5,
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    backgroundColor: Theme.COLORS.WHITE,
  },
  miniSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    //"#B0E0E6",
  },
  subMiniSection: {
    flexDirection: "column",
    justifyContent: "center",
    width: 60,
  },
  addSection: {
    right: 30,
    bottom: 60,
  },
  floatingButton: {
    position: "absolute",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menu: {
    backgroundColor: Theme.COLORS.STEELBLUE,
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: Theme.COLORS.GRADIENT_END,
  },
  wrapper: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.COLORS.STEELBLUE, //Theme.COLORS.WHITE,
  },
  iconSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  paragraphAddress: {
    paddingLeft: 5,
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE, //Theme.COLORS.WHITE,
  },
  paragraph: {
    paddingLeft: 5,
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE, //Theme.COLORS.WHITE,
  },
  mainTitle: {
    color: Theme.COLORS.STEELBLUE,
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  roundSection: {
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  roundSectionText: {
    fontSize: 12,
    color: Theme.COLORS.STEELBLUE, //Theme.COLORS.WHITE,
    fontWeight: "700",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  reminderSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Theme.COLORS.WHITE, //"#B0E0E6",
    borderWidth: 0.5,
    borderColor: "#B0E0E6",
    borderRadius: 5,
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  fillupIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  ExpenseIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
