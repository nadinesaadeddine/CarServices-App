import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Button,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { AntDesign, Entypo, Fontisto, FontAwesome } from "@expo/vector-icons";
import { TextInput, Divider } from "react-native-paper";
import TextBold from "../components/TextBold";
import TextRegular from "../components/TextRegular";
import TextMedium from "../components/TextMedium";
import config from "../../config/config";
import ajax from "../services/RequestServices";
import ajax2 from "../services/UserServices";
import notify from "../services/NotificationServices";
import DateTimePicker from "@react-native-community/datetimepicker";
import PageLoader from "../components/PageLoader";
import moment from "moment";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";
import { round } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");
const URI = config.URI;

function BookService({ navigation, route }) {
  const { company_id } = route.params;
  const { service_id } = route.params;
  const { user_id } = route.params;
  const { UserLocation } = route.params;
  const { locationName } = route.params;
  const { full_address } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [addressEmpty, setEmptyError] = useState(false);

  const defaultDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");
  const defaultTime = new Date().getHours() + ":" + new Date().getMinutes();

  const [book_date, setBookDate] = useState(defaultDate);
  const [book_time, setBookTime] = useState(defaultTime);

  const [book_address, setBookAddress] = useState(full_address);
  const [book_note, setBookNote] = useState("");
  const [company, setCompany] = useState({
    user_id: null,
    company_id: company_id,
    name: "",
    description: "",
    phone_number: "",
    address: "",
    openingDays: null,
    openingHour: null,
    closingHour: null,
    company_image: null,
  });
  const [car, setCar] = useState({
    id: null,
    user_id: user_id,
    car_make: null,
  });

  const [userInfo, setUserInfo] = useState({ name: "" });

  const handleSetCompany = async () => {
    let data = await ajax.getCompanyById(company_id);

    if (data != "") {
      setCompany({
        ...company,
        user_id: user_id,
        company_id: company_id,
        name: data.name,
        description: data.description,
        phone_number: data.phone_number,
        address: data.address,
        openingDays: data.openingDays,
        openingHour: data.openingHour,
        closingHour: data.closingHour,
        company_image: data.company_image,
      });
    }
    setIsLoading(false);
  };

  const getAvgRatingByCompany = async () => {
    let avg = await ajax.getRatingByCompany(company_id);
    if (avg != "") avg = avg.toFixed(1);
    else avg = 5.0;
    return avg;
  };
  const handleSetUserInfo = async () => {
    let data = await ajax2.getUser(user_id);
    setUserInfo({ name: data.first_name + " " + data.last_name });
  };

  const handleSetCar = async () => {
    let data = await ajax.getDefaultUserCar(user_id);

    if (data != "") {
      setCar({
        ...car,
        id: data.id,
        user_id: user_id,
        car_make: data.car_make,
      });
    }
  };

  useEffect(() => {
    handleSetCompany();
    handleSetCar();
    handleSetUserInfo();
  }, []);

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
      setBookDate(newDate);
    }
  };

  const showDatepicker = () => {
    setShowDate(true);
  };
  const showTimepicker = () => {
    setShowTime(true);
  };

  const handleSave = async () => {
    let reqBody = {
      service_id,
      company_id,
      user_id,
      booking_date: book_date,
      booking_time: book_time,
      booking_now: 0,
      price: 0,
      notes: book_note,
      book_address: book_address,
      status: "pending",
      car_id: car.id,
      location: locationName ? locationName : null,
      longitude: UserLocation.longitude,
      latitude: UserLocation.latitude,
      status_level: 0,
    };
    if (book_address != "") {
      let data = await ajax.createRequest(reqBody);
      //console.log(data);
      alert("booked");
      setBookAddress("");
      setBookNote("");
      notify.sendPushNotification(
        "ExponentPushToken[U9Ir_lMworjIk7c4HC4UFO]",
        "New Service Booked",
        "User Name: " + userInfo.name + " at address " + book_address
      );
      navigation.navigate("View Services", { user_id });
    } else {
      setEmptyError(true);
    }
  };

  return (
    <>
      <ScreenHeader title={"Booking"} isBack="1" />
      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, backgroundColor: Theme.COLORS.WHITE }}
        >
          <Image
            source={
              company.company_image
                ? {
                    uri: URI + "/" + company.company_image,
                  }
                : Images.CarWorkshop
            }
            style={{ width: width, height: 250 }}
          />
          <View style={styles.infoIcon}>
            <Fontisto name="info" size={20} color="#fff" />
          </View>

          <View style={styles.sectionInfo}>
            <TextBold style={styles.title}>{company.name}</TextBold>
            <TextRegular style={styles.subTitle}>
              {company.phone_number} - {company.address}
            </TextRegular>
            <Divider
              style={{ width: 300, color: "#444", marginVertical: 18 }}
            />

            <TextMedium style={styles.sectionTitle}>
              About {company.name}
            </TextMedium>

            {/* <Text>Opening Days: {company.openingDays}</Text> */}
            <TextRegular style={styles.sectionAbout}>
              {company.description}
            </TextRegular>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginVertical: 10,
              }}
            >
              <Entypo
                name="time-slot"
                size={18}
                color={Theme.COLORS.GRADIENT_END}
              />
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TextRegular style={styles.sectionSmall}>
                  {moment(company.openingHour, "HH:mm:ss").format("h:mm a")}
                  {" - "}
                  {moment(company.closingHour, "HH:mm:ss").format("h:mm a")}
                </TextRegular>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginVertical: 10,
              }}
            >
              <Entypo
                name="price-tag"
                size={18}
                color={Theme.COLORS.GRADIENT_END}
              />
              <TextRegular style={styles.sectionSmall}>
                10,000 - 700,000 LL
              </TextRegular>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginVertical: 10,
              }}
            >
              <Entypo name="star" size={18} color={Theme.COLORS.GRADIENT_END} />
              <Text style={styles.sectionSmall}>4.0</Text>
            </View>
          </View>
          <View style={styles.carSection}>
            <Fontisto name="car" size={18} color={Theme.COLORS.GRADIENT_END} />
            <Text style={styles.sectionSmall}>{car.car_make}</Text>
          </View>

          <View style={styles.sectionInfo}>
            <View style={styles.textContainer}>
              <View style={{ paddingRight: 20 }}>
                <Text style={{ color: Theme.COLORS.STEELBLUE }}>
                  Set a Date
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.bookDate}>
                  {moment(new Date(book_date)).format("DD MMM YYYY")}
                </Text>
                <FontAwesome
                  name="calendar"
                  size={16}
                  color={Theme.COLORS.GRADIENT_END}
                  onPress={showDatepicker}
                />
              </View>
              {showDate && (
                <DateTimePicker
                  mode="date"
                  display="calendar"
                  style={styles.textInput}
                  value={date}
                  onChange={(date) => onChangeDate(date)}
                />
              )}
            </View>
            <View style={styles.textContainer}>
              <View style={{ paddingRight: 20 }}>
                <Text style={{ color: Theme.COLORS.STEELBLUE }}>
                  Set A Time
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.bookDate}>
                  {moment(book_time, "HH:mm").format("h:mm a")}
                </Text>
                <FontAwesome
                  name="calendar"
                  size={16}
                  color={Theme.COLORS.GRADIENT_END}
                  //onPress={showTimepicker}
                />
                {/* {showTime && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    style={styles.textInput}
                    value={time}
                    onChange={(time) => onChangeDate(time)}
                  />
                )} */}
              </View>
            </View>
            <TextInput
              label="Address"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: "transparent",
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={[styles.textInput, addressEmpty && styles.emptyError]}
              value={book_address}
              onChangeText={(book_address) => {
                setBookAddress(book_address);
                setEmptyError(false);
              }}
              multiline
            />
            {addressEmpty && (
              <Text style={{ color: "red", fontSize: 12 }}>
                Address is Empty!
              </Text>
            )}
            <TextInput
              label="Extra Notes"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: "transparent",
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={book_note}
              onChangeText={(book_note) => setBookNote(book_note)}
              multiline
            />
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => handleSave()}
              >
                <TextBold style={styles.buttonText}>BOOK</TextBold>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default BookService;

const styles = StyleSheet.create({
  textInput: {
    width: width * 0.8,
    fontSize: 14,
    height: 60,
    backgroundColor: "#FFFAFA",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    marginBottom: 15,
  },
  buttoncontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  createButton: {
    width: width * 0.8,
    alignItems: "center",
    backgroundColor: Theme.COLORS.STEELBLUE,
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 14,
    color: Theme.COLORS.WHITE,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 64,
    left: 32,
    right: 32,
  },
  topButtonsRight: {
    marginLeft: 12,
    color: "#fff",
  },
  infoIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 36,
    height: 36,
    right: 32,
    top: 230,
    backgroundColor: Theme.COLORS.GRADIENT_END,
    borderRadius: 56 / 2,
    zIndex: 10,
  },
  sectionInfo: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    marginBottom: 8,
    backgroundColor: "#FFFAFA",
  },
  title: {
    color: "#4682B4",
    fontSize: 26,
  },
  subTitle: {
    color: "#4682B4",
    fontWeight: "600",
    marginTop: 4,
  },
  sectionTitle: {
    color: "#4682B4",
    fontSize: 15,
  },
  sectionAbout: {
    color: "#4682B4",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 20,
  },
  sectionSmall: {
    color: "#4682B4",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 20,
    paddingLeft: 10,
  },
  carSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
    height: 50,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  bookDate: {
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE,
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 1,
    width: 100,
    alignItems: "center",
    alignContent: "center",
  },
  emptyError: {
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
});
