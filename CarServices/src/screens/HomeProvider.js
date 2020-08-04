import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
  Button,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import ajax from "../services/RequestServices";
import { useFocusEffect } from "@react-navigation/native";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { Card, Title, Paragraph, Divider } from "react-native-paper";
import moment from "moment";
import { ScreenHeader } from "../components/ScreenHeader";
import { PieChart } from "react-native-chart-kit";
import Tabs from "react-native-tabs";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

function HomeProvider({ navigation, route }) {
  const { user_id } = route.params;
  const [services, setServices] = useState([]);
  const [page, setPage] = useState("second");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = (value) => setShow(value);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate || date;

    showPicker(false);
    setDate(selectedDate);
  };

  const getUserServices = async () => {
    let data = await ajax.getServicesByCompany(user_id);
    setServices(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserServices();
    }, [])
  );

  const chartConfig = {
    backgroundGradientFrom: "#EEE8AA",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#EEE8AA",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(75,0,130, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    fillShadowGradientOpacity: 1,
    fillShadowGradient: "rgba(75,0,130)",
    decimalPlaces: 0,
  };

  const data = [
    {
      name: "Car Wash",
      total: 6,
      color: "#DDA0DD",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Mechanics",
      total: 2,
      color: "#87CEEB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Others",
      total: 4,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  return (
    <>
      <ScreenHeader title="Home" />
      <View></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width }}
      >
        <View style={{ paddingBottom: 10, paddingHorizontal: 2 }}>
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
                  <Text style={{ fontSize: 14, color: "#FFD700" }}>12</Text>
                </View>
                <Text style={styles.roundSectionText}>Delivered Services</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  height: 260,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PieChart
                  data={data}
                  width={width * 0.9}
                  height={240}
                  chartConfig={chartConfig}
                  accessor="total"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </View>
            </View>
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
                              Ongoing Service
                            </Text>
                          </View>

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
                                {service.user.first_name}{" "}
                                {service.user.last_name}
                              </Title>
                              <View style={[styles.iconSection]}>
                                <MaterialIcons
                                  name="location-on"
                                  size={16}
                                  color="#D3D3D3"
                                />
                                <Paragraph style={styles.paragraphAddress}>
                                  {service.book_address}
                                </Paragraph>
                              </View>
                              <View style={[styles.iconSection]}>
                                <FontAwesome
                                  name="phone"
                                  size={16}
                                  color="#D3D3D3"
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
      </ScrollView>
    </>
  );
}

export default HomeProvider;

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
  itemPicture: {
    width: 80,
    height: 80,
    borderRadius: 62,
    borderWidth: 0,
  },
});
