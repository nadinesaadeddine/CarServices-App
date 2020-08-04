import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  Card,
  Title,
  Paragraph,
  Divider,
  Text,
  TextInput,
} from "react-native-paper";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScreenHeader } from "../components/ScreenHeader";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import moment from "moment";
import ajax from "../services/RequestServices";
import notify from "../services/NotificationServices";
import PageLoader from "../components/PageLoader";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";
import {
  MaterialIcons,
  Entypo,
  Octicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");
function ServiceDetail({ route, navigation }) {
  const { userservice_id } = route.params;
  const { user_id } = route.params;
  const progressColor = "#4682B4";
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const [service, setService] = useState({
    userservice_id: userservice_id,
    book_address: null,
    booking_date: null,
    booking_time: null,
    done_date: null,
    done_time: null,
    car_id: null,
    isDone: 0,
    notes: null,
    price: "" + 0,
    service_id: null,
    status: null,
    status_level: 0,
    user_name: "",
    user_address: "",
    user_number: "",
  });

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
      setService({
        ...service,
        done_date: newDate,
      });
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  const onChangeTime = (selectedTime) => {
    let currentTime = selectedTime || null;
    let newTime = null;
    //console.log(selectedTime);
    setShowTime(false);
    if (currentTime == null) setTime(time);
    else {
      currentTime = new Date(currentTime.nativeEvent.timestamp);
      newTime = currentTime.getHours() + ":" + currentTime.getMinutes();
      setService({
        ...service,
        done_time: newTime,
      });
    }
  };
  const showTimepicker = () => {
    setShowTime(true);
  };

  const getServiceById = async () => {
    let data = await ajax.getServicesById(userservice_id);
    //console.log(data);
    setService({
      ...service,
      userservice_id: userservice_id,
      book_address: data.book_address,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      done_date: data.done_date,
      done_time: data.done_time,
      car_id: data.car_id,
      isDone: 0,
      notes: data.notes,
      price: "" + data.price,
      service_id: data.service_id,
      status: data.status,
      status_level: data.status_level,
      user_name: data.user.first_name + " " + data.user.last_name,
      user_number: data.user.phone_number,
    });
    setIsLoading(false);
  };

  const onNextStep = async () => {
    let newStatusLvl = 0;
    let newStatus = "Pending";

    if (service.status_level == 0) {
      newStatusLvl = 1;
      newStatus = "Accepted";
    }
    if (service.status_level == 1) {
      newStatusLvl = 2;
      newStatus = "Picked Up";
    }
    if (service.status_level == 2) {
      newStatusLvl = 3;
      newStatus = "Working On";
    }
    if (service.status_level == 3 || service.status_level == 4) {
      newStatusLvl = 4;
      newStatus = "Delivered";
    }
    setService({
      ...service,
      status: newStatus,
      status_level: newStatusLvl,
    });
    let updatedService = {
      userservice_id: userservice_id,
      done_date: service.done_date,
      done_date: service.done_date,
      done_time: service.done_time,
      price: service.price,
      isDone: 0,
      status: newStatus,
      status_level: newStatusLvl,
    };
    let data = await ajax.updateRequest(updatedService);
    setService({
      ...service,
      userservice_id: userservice_id,
      book_address: data.book_address,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      done_date: data.done_date,
      done_time: data.done_time,
      car_id: data.car_id,
      isDone: data.isDone,
      notes: data.notes,
      price: "" + data.price,
      service_id: data.service_id,
      status: data.status,
      status_level: data.status_level,
    });
    //console.log(service);
    notify.sendPushNotification(
      "ExponentPushToken[Yhju9pP5CKWk-QqjZI4lyZ]", //"ExponentPushToken[U9Ir_lMworjIk7c4HC4UFO]",
      "Your Service",
      "Service Current Status Updated: " + data.status
    );
  };
  useEffect(() => {
    getServiceById();
  }, []);

  const nextButtonStyle = {
    color: Theme.COLORS.STEELBLUE,
    fontSize: 14,
    fontWeight: "bold",
  };
  let isComplete = service.status_level == 4 ? true : false;

  let removeBtn = isComplete ? true : false;

  return (
    <>
      <ScreenHeader title="Service Summary" isBack="1" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, backgroundColor: Theme.COLORS.WHITE }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 10,
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Image
            source={Images.FemaleProfilePicture}
            style={styles.itemPicture}
          />
          <View style={{ paddingLeft: 15 }}>
            <Text style={styles.itemTitle}>{service.user_name}</Text>
            <View style={[styles.iconSection]}>
              <MaterialIcons name="location-on" size={16} color="#A9A9A9" />
              <Text style={{ fontSize: 14, color: "#A9A9A9", paddingLeft: 5 }}>
                {service.book_address}
              </Text>
            </View>
            <View style={[styles.iconSection]}>
              <FontAwesome name="phone" size={16} color="#A9A9A9" />
              <Text style={{ fontSize: 14, color: "#A9A9A9", paddingLeft: 5 }}>
                {service.user_number}
              </Text>
            </View>
          </View>
        </View>
        <Divider />
        <View style={{ paddingVertical: 10 }}>
          <Text style={[styles.itemTitle, { paddingLeft: 10 }]}>
            Service Progress
          </Text>
          <ProgressSteps
            activeStep={service.status_level}
            activeStepIconBorderColor={progressColor}
            completedProgressBarColor={progressColor}
            completedStepIconColor={progressColor}
            activeLabelColor={progressColor}
            activeStepNumColor={Theme.COLORS.WHITE}
            disabledStepNumColor="#E6E6FA"
            isComplete={isComplete}
            marginBottom={40}
          >
            <ProgressStep
              label="Accepted"
              nextBtnTextStyle={nextButtonStyle}
              onNext={onNextStep}
              previousBtnDisabled={true}
              previousBtnText=""
              nextBtnText="Mark as Accepted"
            />
            <ProgressStep
              label="Picked Up"
              nextBtnTextStyle={nextButtonStyle}
              onNext={onNextStep}
              previousBtnDisabled={true}
              previousBtnText=""
              nextBtnText="Mark as Picked Up"
            ></ProgressStep>
            <ProgressStep
              label="Working On"
              nextBtnTextStyle={nextButtonStyle}
              onNext={onNextStep}
              previousBtnDisabled={true}
              previousBtnText=""
              nextBtnText="Mark as Working On"
            ></ProgressStep>
            <ProgressStep
              label="Delivered"
              nextBtnTextStyle={nextButtonStyle}
              onSubmit={onNextStep}
              previousBtnDisabled={true}
              previousBtnText=""
              removeBtnRow={removeBtn}
              finishBtnText="Mark as Delivered"
            ></ProgressStep>
          </ProgressSteps>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <Text style={[styles.itemTitle, [{ paddingBottom: 5 }]]}>
            Service Details
          </Text>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Full Address: </Text>
            <Text style={styles.textDetails}>{service.book_address}</Text>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Booked On: </Text>
            <Text style={styles.textDetails}>
              {moment(new Date(service.booking_date)).format("DD MMM YYYY")}
            </Text>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Booked At: </Text>
            <Text style={styles.textDetails}>
              {moment(service.booking_time, "HH:mm").format("h:mm a")}
            </Text>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Price: </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                value={service.price}
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={{
                  fontSize: 14,
                  height: 20,
                  backgroundColor: Theme.COLORS.WHITE,
                  width: 80,
                }}
                keyboardType={"numeric"}
                onChangeText={(price) => setService({ ...service, price })}
              />
              <Text style={styles.textTitle}>LL </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Done On: </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text style={[styles.textDetails, { width: 80 }]}>
                {service.done_date == null
                  ? "n/a"
                  : moment(new Date(service.done_date)).format("DD MMM YYYY")}
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

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Done At: </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text style={[styles.textDetails, { width: 80 }]}>
                {service.done_time == null
                  ? "n/a"
                  : moment(service.done_time, "HH:mm:ss").format("h:mm a")}
              </Text>
              <MaterialIcons
                name="timelapse"
                size={18}
                color={Theme.COLORS.GRADIENT_END}
                onPress={showTimepicker}
              />
              {showTime && (
                <DateTimePicker
                  mode="time"
                  display="spinner"
                  value={time}
                  onChange={(time) => onChangeTime(time)}
                />
              )}
            </View>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Status: </Text>
            <Text style={styles.textDetails}>{service.status}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function ViewUserService({ route, navigation }) {
  const { user_id } = route.params;
  const [userservice_id, setUserServiceId] = useState(null);
  const [services, setServices] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserServices = async () => {
    let data = await ajax.getServicesByCompany(user_id);
    setServices(data);
    //console.log(data);
    setIsLoading(false);
  };

  const handleViewService = (id) => {
    navigation.navigate("View Services Detail", {
      user_id,
      userservice_id: id,
    });
  };

  const handleHideModal = () => {
    setUserServiceId(null);
    setModalVisible(false);
  };
  const handleChat = () => {
    navigation.navigate("Chat", { user_id });
  };
  // useEffect(() => {
  //   getUserServices();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserServices();
    }, [])
  );
  return (
    <>
      <ScreenHeader title="List of Services" />
      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
          {services.length > 0 &&
            services.map((service) => {
              return (
                <View key={service.id} style={styles.card}>
                  <Card
                    onPress={(id) => handleViewService(service.id)}
                    style={styles.mainCard}
                  >
                    <Card.Content
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingBottom: 10,
                          }}
                        >
                          <Image
                            source={Images.FemaleProfilePicture}
                            style={styles.itemPicture}
                          />
                          <View style={{ paddingLeft: 10 }}>
                            <Title style={styles.itemTitle}>
                              {service.user.first_name} {service.user.last_name}
                            </Title>
                            <View style={[styles.iconSection]}>
                              <MaterialIcons
                                name="location-on"
                                size={16}
                                color="#A9A9A9"
                              />
                              <Paragraph style={styles.paragraphAddress}>
                                {service.book_address}
                              </Paragraph>
                            </View>
                            <View style={[styles.iconSection]}>
                              <FontAwesome
                                name="phone"
                                size={16}
                                color="#A9A9A9"
                              />
                              <Paragraph style={styles.paragraphAddress}>
                                {service.user.phone_number}
                              </Paragraph>
                            </View>
                          </View>
                        </View>
                        <Divider style={{ width: width * 0.9 }} />
                        <View
                          style={{
                            flexDirection: "column",
                            paddingVertical: 10,
                          }}
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
                              {" At "}
                              {moment(service.booking_time, "HH:mm:ss").format(
                                "h:mm a"
                              )}
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
                        <Divider style={{ width: width * 0.9 }} />
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            paddingTop: 10,
                          }}
                        >
                          <Paragraph style={styles.paragraph}>
                            Chat available for client support{" "}
                          </Paragraph>
                          <View>
                            <Icon
                              name="chat"
                              color={Theme.COLORS.STEELBLUE}
                              onPress={() => handleChat()}
                            />
                          </View>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                  {/* {isModalVisible && userservice_id == service.id && (
                    <ServiceModal
                      handleHideModal={handleHideModal}
                      isModalVisible={isModalVisible}
                      userservice_id={service.id}
                    />
                  )} */}
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
}

export default { ViewUserService, ServiceDetail };

const styles = StyleSheet.create({
  card: {
    paddingBottom: 10,
    backgroundColor: Theme.COLORS.WHITE,
    paddingHorizontal: 5,
  },
  mainCard: {
    backgroundColor: Theme.COLORS.WHITE,
    borderWidth: 0.5,
    borderColor: "#DCDCDC",
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.COLORS.STEELBLUE,
  },

  iconSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: Theme.COLORS.WHITE,
    width: width,
    height: height * 0.75,
  },
  paragraphAddress: {
    paddingLeft: 5,
    fontSize: 14,
    color: "#A9A9A9",
  },
  paragraph: {
    paddingLeft: 5,
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE,
  },

  textTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A9A9A9",
    paddingBottom: 5,
  },
  textDetails: {
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE,
    paddingBottom: 5,
  },
  itemPicture: {
    width: 80,
    height: 80,
    borderRadius: 62,
    borderWidth: 0,
  },
});
