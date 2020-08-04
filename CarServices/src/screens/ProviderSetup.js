import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import PageLoader from "../components/PageLoader";
import { ServiceList } from "../components/ServiceList";
import { TextInput, Switch, Checkbox } from "react-native-paper";
import { ListItem } from "react-native-elements";
import ViewMaps from "../components/ViewMaps";
import ajax from "../services/ProviderServices";
import ajax2 from "../services/RequestServices";
import config from "../../config/config";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");
const URI = config.URI;
function Setup({ route, navigation }) {
  const handleList = (value) => {
    if (value == "company") {
      navigation.navigate("Company Setup");
    }
    if (value == "service") {
      navigation.navigate("Services Setup");
    }
  };
  const list = [
    {
      title: "Company Settings",
      value: "company",
      icon: "done-all",
    },
    {
      title: "Services Settings",
      value: "service",
      icon: "done-all",
    },
  ];
  return (
    <>
      <ScreenHeader title="Settings" />
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            titleStyle={{ color: Theme.COLORS.STEELBLUE, fontWeight: "bold" }}
            leftIcon={{ name: item.icon, color: Theme.COLORS.GRADIENT_END }}
            bottomDivider
            chevron
            onPress={(value) => handleList(item.value)}
          />
        ))}
      </View>
    </>
  );
}

function CompanySetup({ route, navigation }) {
  const { user_id } = route.params;
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [time2, setTime2] = useState(new Date());
  const [showTime2, setShowTime2] = useState(false);

  const onChangeTime = (selectedTime) => {
    let currentTime = selectedTime || null;
    let newTime = null;
    //console.log(selectedTime);
    setShowTime(false);
    if (currentTime == null) setTime(time);
    else {
      currentTime = new Date(currentTime.nativeEvent.timestamp);
      newTime = currentTime.getHours() + ":" + currentTime.getMinutes();
      setCompany({
        ...company,
        openingHour: newTime,
      });
    }
  };
  const showTimepicker = () => {
    setShowTime(true);
  };
  const onChangeTime2 = (selectedTime) => {
    let currentTime = selectedTime || null;
    let newTime = null;
    //console.log(selectedTime);
    setShowTime2(false);
    if (currentTime == null) setTime2(time);
    else {
      currentTime = new Date(currentTime.nativeEvent.timestamp);
      newTime = currentTime.getHours() + ":" + currentTime.getMinutes();
      setCompany({
        ...company,
        closingHour: newTime,
      });
    }
  };
  const showTimepicker2 = () => {
    setShowTime2(true);
  };
  const [company, setCompany] = useState({
    user_id: user_id,
    company_id: null,
    name: "",
    description: "",
    phone_number: "",
    address: "",
    location: null,
    longitude: 0,
    latitude: 0,
    openingDays: null,
    openingHour: null,
    closingHour: null,
    isClosed: 0,
    company_image: null,
  });

  const handleSetCompany = async () => {
    let data = await ajax.getCompanyByUser(user_id);

    if (data != "") {
      setCompany({
        ...company,
        company_id: data.id,
        name: data.name,
        description: data.description,
        phone_number: data.phone_number,
        address: data.address,
        location: data.location,
        longitude: data.longitude,
        latitude: data.latitude,
        openingDays: data.openingDays,
        openingHour: data.openingHour,
        closingHour: data.closingHour,
        isClosed: data.isClosed,
      });
    }
  };

  const getUserLocation = (location) => {
    handleSetCompany();
    setCompany({
      ...company,
      longitude: location.longitude,
      latitude: location.latitude,
    });
  };

  useEffect(() => {
    handleSetCompany();
  }, []);

  const handleSaveCompany = async () => {
    console.log(company);
    let data = await ajax.saveCompany(company);
    alert("company was saved");
    setCompany({
      ...company,
      user_id: user_id,
      company_id: data.id,
      name: data.name,
      description: data.description,
      phone_number: data.phone_number,
      address: data.address,
      location: data.location,
      longitude: data.longitude,
      latitude: data.latitude,
      openingDays: data.openingDays,
      openingHour: data.openingHour,
      closingHour: data.closingHour,
      isClosed: data.isClosed,
    });
  };

  return (
    <>
      <ScreenHeader title="Company" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
        <ImageBackground
          source={
            company.company_image
              ? {
                  uri: URI + "/" + company.company_image,
                }
              : Images.CarWorkshop
          }
          style={styles.companyImage}
          imageStyle={styles.companyImage}
        />
        <View
          style={{
            padding: 30,
            marginHorizontal: 5,
            marginTop: -30,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            backgroundColor: Theme.COLORS.WHITE,
          }}
        >
          <View style={styles.textContainer}>
            <TextInput
              label="Company Name"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: Theme.COLORS.STEELBLUE,
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={company.name}
              onChangeText={(name) => {
                setCompany({ ...company, name });
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <TextInput
              label="Description"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: Theme.COLORS.STEELBLUE,
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={company.description}
              onChangeText={(description) => {
                setCompany({ ...company, description });
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <TextInput
              label="Phone Number"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: Theme.COLORS.STEELBLUE,
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={company.phone_number}
              onChangeText={(phone_number) => {
                setCompany({ ...company, phone_number });
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <TextInput
              label="Address"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: Theme.COLORS.STEELBLUE,
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={company.address}
              multiline
              onChangeText={(address) => {
                setCompany({ ...company, address });
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={{ color: "grey", fontSize: 12, paddingLeft: 15 }}>
              Opening Days
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: width * 0.9,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.textStyle}>Monday</Text>
                  <Checkbox status="checked" />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.textStyle}>Thursday</Text>
                  <Checkbox status="checked" />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.textStyle}>Sunday</Text>
                  <Checkbox />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.textStyle}>Tuesday</Text>
                  <Checkbox status="checked" />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.textStyle}>Friday</Text>
                  <Checkbox status="checked" />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.textStyle}>Wednesday</Text>
                  <Checkbox status="checked" />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.textStyle}>Saturday</Text>
                  <Checkbox status="checked" />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={{ color: "grey", fontSize: 12, paddingLeft: 15 }}>
              Opening Time
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Text style={[styles.textStyle, { width: 100 }]}>
                {company.openingHour
                  ? moment(company.openingHour, "HH:mm").format("h:mm a")
                  : "n/a"}
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

          <View style={styles.textContainer}>
            <Text style={{ color: "grey", fontSize: 12, paddingLeft: 15 }}>
              Closing Time
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Text style={[styles.textStyle, { width: 100 }]}>
                {company.closingHour
                  ? moment(company.closingHour, "HH:mm").format("h:mm a")
                  : "n/a"}
              </Text>
              <MaterialIcons
                name="timelapse"
                size={18}
                color={Theme.COLORS.GRADIENT_END}
                onPress={showTimepicker2}
              />
              {showTime2 && (
                <DateTimePicker
                  mode="time"
                  display="spinner"
                  value={time2}
                  onChange={(time2) => onChangeTime2(time2)}
                />
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={styles.textStyle}>Closed</Text>
            <Switch
              value={company.isClosed == "0" ? false : true}
              color={Theme.COLORS.GRADIENT_END}
              onValueChange={() =>
                setCompany({
                  ...company,
                  isClosed: company.isClosed == "0" ? "1" : "0",
                })
              }
            />
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ViewMaps
              style={styles.mapStyle}
              getUserLocation={getUserLocation}
              coordinate={{
                latitude: company.latitude,
                longitude: company.longitude,
              }}
            />
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => handleSaveCompany()}
            >
              <Text style={styles.buttonText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function ServiceSetup({ route, navigation }) {
  const { user_id } = route.params;
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAllServices = async () => {
    let data = await ajax2.getAllServices();
    setServices(data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllServices();
  }, []);

  const handleList = (service_id, service_name) => {
    navigation.navigate("Add Service", { service_id, service_name, user_id });
  };

  return (
    <>
      <ScreenHeader title="Service Setup" />
      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, backgroundColor: Theme.COLORS.WHITE, flex: 1 }}
        >
          <ServiceList
            user_id={user_id}
            services={services}
            handleList={handleList}
          />
        </ScrollView>
      )}
    </>
  );
}

function addService({ route, navigation }) {
  const { user_id } = route.params;
  const { service_id } = route.params;
  const { service_name } = route.params;
  const [service, setService] = useState({
    id: null,
    company_id: null,
    service_id: service_id,
    description: null,
    fromprice: 0,
    toprice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const getService = async () => {
    let data = await ajax.getServicesByCompany(user_id, service_id);
    console.log(data.fromprice);
    if (data) {
      setService({
        ...service,
        id: data.id,
        company_id: data.company_id,
        service_id: service_id,
        description: data.description,
        fromprice: data.fromprice,
        toprice: data.toprice,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <>
      <ScreenHeader title={service_name + " Setup"} />
      {isLoading ? (
        <PageLoader />
      ) : (
        <View
          style={{
            backgroundColor: Theme.COLORS.WHITE,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.textContainer}>
            <TextInput
              label="Service Description"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: Theme.COLORS.STEELBLUE,
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={service.description}
              onChangeText={(description) => {
                setService({ ...service, description });
              }}
            />
          </View>
          <View style={[styles.textContainer, { flexDirection: "row" }]}>
            <TextInput
              label="From Price"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: Theme.COLORS.STEELBLUE,
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={service.fromprice}
              onChangeText={(fromprice) => {
                setService({ ...service, fromprice });
              }}
              keyboardType={"numeric"}
            />
            <Text>LL</Text>
          </View>
          <View style={[styles.textContainer, { flexDirection: "row" }]}>
            <TextInput
              label="To Price"
              theme={{
                colors: {
                  primary: Theme.COLORS.STEELBLUE,
                  underlineColor: Theme.COLORS.STEELBLUE,
                  text: Theme.COLORS.STEELBLUE,
                },
              }}
              style={styles.textInput}
              value={service.toprice}
              onChangeText={(toprice) => {
                setService({ ...service, toprice });
              }}
              keyboardType={"numeric"}
            />
            <Text>LL</Text>
          </View>
        </View>
      )}
    </>
  );
}
export default {
  Setup,
  CompanySetup,
  ServiceSetup,
  addService,
};

const styles = StyleSheet.create({
  mapStyle: {
    width: width * 0.9,
    height: height * 0.4,
  },
  textContainer: {
    width: width,
    marginBottom: 15,
  },
  textInput: {
    width: width * 0.75,
    paddingLeft: 2,
    backgroundColor: Theme.COLORS.WHITE,
    fontSize: 14,
    height: 60,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    width: width * 0.8,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: Theme.COLORS.PRIMARY,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Theme.COLORS.WHITE,
  },

  companyImage: {
    width: width,
    height: 180,
  },
  textStyle: {
    color: Theme.COLORS.STEELBLUE,
    fontSize: 14,
  },
});
