import React, { useState, useEffect } from "react";
import {
  View,
  Animated,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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
import { ScreenHeader } from "../components/ScreenHeader";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Rating } from "react-native-elements";
import moment from "moment";
import ajax from "../services/RequestServices";
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

function RatingPopUp(props) {
  const [rateVal, setRateVal] = useState(3);

  const handleRatingSave = async () => {
    let rating = {
      userservice_id: props.ratedService_id,
      user_id: props.user_id,
      company_id: props.ratedCompany_id,
      rating_value: rateVal,
    };
    let request = { userservice_id: props.ratedService_id, isDone: 1 };
    let data = await ajax.addRating(rating);
    let data2 = await ajax.updateRequest(request);
    console.log(data2);
    props.handleHideRating();
  };

  return (
    <Modal
      isVisible={props.isRatingVisible}
      animationType="slide"
      style={styles.modalContainer}
    >
      <View style={styles.ratingView}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Theme.COLORS.STEELBLUE,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.modalTitle}>Please Rate Your Service</Text>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Rating
            //showRating
            onFinishRating={(rateVal) => setRateVal(rateVal)}
            style={{ paddingVertical: 10 }}
          />
        </View>
        <View style={styles.buttonSection}>
          <View>
            <TouchableOpacity onPress={handleRatingSave}>
              <Text style={styles.buttonIcon}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ServiceDetail({ route, navigation }) {
  const progressColor = "#4682B4";
  const { userservice_id } = route.params;
  const { user_id } = route.params;

  const [service, setService] = useState({
    userservice_id: userservice_id,
    book_address: null,
    booking_date: null,
    booking_time: null,
    car_id: null,
    isDone: 0,
    notes: null,
    price: 0,
    service_id: null,
    status: null,
    status_level: 0,
    done_date: null,
    done_time: null,
    company_name: null,
    company_address: null,
    phone_number: null,
  });

  const getServiceById = async () => {
    let data = await ajax.getServicesById(userservice_id);
    //console.log(data);
    setService({
      ...service,
      userservice_id: userservice_id,
      book_address: data.book_address,
      booking_date: data.booking_date,
      booking_time: data.booking_time,
      car_id: data.car_id,
      isDone: data.isDone,
      notes: data.notes,
      price: data.price,
      service_id: data.service_id,
      status: data.status,
      status_level: data.status_level,
      done_date: data.done_date,
      done_time: data.done_time,
      company_name: data.company.name,
      company_address: data.company.address,
      phone_number: data.company.phone_number,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getServiceById();
    }, [])
  );

  const isComplete = service.status_level == 4 ? true : false;
  return (
    <>
      <ScreenHeader title="Service Summary" isBack="1" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, backgroundColor: Theme.COLORS.WHITE }}
      >
        <View style={{ paddingLeft: 10, paddingTop: 15, paddingBottom: 15 }}>
          <Text style={styles.itemTitle}>{service.company_name}</Text>
          <View style={[styles.iconSection]}>
            <MaterialIcons name="location-on" size={16} color="#A9A9A9" />
            <Text style={{ fontSize: 14, color: "#A9A9A9", paddingLeft: 5 }}>
              {service.company_address}
            </Text>
          </View>
          <View style={[styles.iconSection]}>
            <FontAwesome name="phone" size={16} color="#A9A9A9" />
            <Text style={{ fontSize: 14, color: "#A9A9A9", paddingLeft: 5 }}>
              {service.phone_number}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ paddingVertical: 10 }}>
          <Text style={[styles.itemTitle, { paddingLeft: 10 }]}>
            Your Service Progress
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
          >
            <ProgressStep label="Accepted" removeBtnRow />
            <ProgressStep label="Picked Up" removeBtnRow />
            <ProgressStep label="Working On" removeBtnRow />
            <ProgressStep label="Delivered" removeBtnRow />
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
            <Text style={styles.textTitle}>Deliver to</Text>
            <Text style={styles.textDetails}>{service.book_address}</Text>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Booked On</Text>
            <Text style={styles.textDetails}>
              {moment(new Date(service.booking_date)).format("DD MMM YYYY")} at{" "}
              {moment(service.booking_time, "HH:mm").format("h:mm a")}
            </Text>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Amount Paid</Text>
            <Text style={styles.textDetails}>{service.price} LL</Text>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Delivered On</Text>
            <Text style={styles.textDetails}>
              {service.done_date == null
                ? "TBD"
                : moment(new Date(service.done_date)).format("DD MMM YYYY")}
              {" At "}{" "}
              {service.done_time == null
                ? "TBD"
                : moment(service.done_time, "HH:mm").format("h:mm a")}
            </Text>
          </View>

          <View style={{ flexDirection: "column", paddingVertical: 5 }}>
            <Text style={styles.textTitle}>Service Status</Text>
            <Text style={styles.textDetails}>{service.status}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function ViewUserService({ route, navigation }) {
  const { user_id } = route.params;
  const [services, setServices] = useState([]);
  const [doneServices, setDoneServices] = useState([]);
  const [ratedService_id, setRatedServiceId] = useState(null);
  const [ratedCompany_id, setRatedCompanyId] = useState(null);
  const [isRatingVisible, seRatingVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [active, setActive] = useState(0);
  const [xTabOne, setxTabOne] = useState(0);
  const [xTabTwo, setxTabTwo] = useState(0);
  const [translateY, setTranslateY] = useState(-1000);

  const translateX = new Animated.Value(0.01);
  const translateXTabOne = new Animated.Value(0.01);
  const translateXTabTwo = new Animated.Value(width);

  const handleSlide = (isActive, type) => {
    // Animated.spring(translateX, {
    //   toValue: type,
    //   duration: 100,
    // }).start(() => {
    //   setActive(isActive);
    // });

    if (isActive === 0) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: type,
          duration: 100,
        }).start(() => {
          setActive(isActive);
        }),
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: type,
          duration: 100,
        }).start(() => {
          setActive(isActive);
        }),
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
        }).start(),
      ]);
    }
  };

  const getUserUndoneServices = async () => {
    let data = await ajax.getServicesByUser(user_id);
    setServices(data);
    setIsLoading(false);
  };

  const getUserDoneServices = async () => {
    let data = await ajax.getServiceDoneByUser(user_id);
    setDoneServices(data);
    setIsLoading(false);
  };

  const handleViewService = (id) => {
    navigation.navigate("View Services Detail", {
      user_id,
      userservice_id: id,
    });
  };

  const handleChat = (id) => {
    navigation.navigate("Chat", { user_id });
  };

  const getPreDoneService = async () => {
    let data = await ajax.getServiceFinalByUser(user_id);
    console.log(data);
    if (data != "") {
      setRatedServiceId(data.id);
      setRatedCompanyId(data.company_id);
      seRatingVisible(true);
    }
  };
  const handleHideRating = () => {
    setRatedServiceId(null);
    setRatedCompanyId(null);
    seRatingVisible(false);
    getUserServices();
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserUndoneServices();
      getUserDoneServices();
      getPreDoneService();
    }, [])
  );

  return (
    <>
      <ScreenHeader title="Your Services" navigation={navigation} />
      <View
        style={{
          paddingHorizontal: 5,
          backgroundColor: Theme.COLORS.WHITE,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 36,
            position: "relative",
            paddingBottom: 5,
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: "50%",
              height: "100%",
              top: 0,
              left: 0,
              backgroundColor: Theme.COLORS.GRADIENT_END,
              borderRadius: 4,
              transform: [
                {
                  translateX,
                },
              ],
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: Theme.COLORS.GRADIENT_END,
              borderRadius: 4,
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onLayout={(event) => setxTabOne(event.nativeEvent.layout.x)}
            onPress={(isActive, type) => handleSlide(0, xTabOne)}
          >
            <Text
              style={[
                styles.tabs,
                {
                  color:
                    active === 0
                      ? Theme.COLORS.WHITE
                      : Theme.COLORS.GRADIENT_END,
                },
              ]}
            >
              On going
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: Theme.COLORS.GRADIENT_END,
              borderRadius: 4,
              borderLeftWidth: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onLayout={(event) => setxTabTwo(event.nativeEvent.layout.x)}
            onPress={(isActive, type) => handleSlide(1, xTabTwo)}
          >
            <Text
              style={[
                styles.tabs,
                {
                  color:
                    active === 1
                      ? Theme.COLORS.WHITE
                      : Theme.COLORS.GRADIENT_END,
                },
              ]}
            >
              Delivered
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Theme.COLORS.WHITE }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX: translateXTabOne,
                },
              ],
            }}
            onLayout={(event) => setTranslateY(event.nativeEvent.layout.height)}
          >
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
                              source={Images.CarWorkshop}
                              style={styles.itemPicture}
                            />
                            <View style={{ paddingLeft: 10 }}>
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
                            <View style={[styles.iconSection]}>
                              <AntDesign
                                name="star"
                                size={18}
                                color={Theme.COLORS.GRADIENT_END}
                              />
                              <Paragraph style={styles.paragraph}>
                                {service.rating != null
                                  ? service.rating.rating_value.toFixed(1)
                                  : "Not rated yet"}
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
                              Chat available for support{" "}
                            </Paragraph>
                            <View>
                              <Icon
                                name="chat"
                                size={22}
                                color={Theme.COLORS.STEELBLUE}
                                onPress={(id) => handleChat(service.id)}
                              />
                            </View>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </View>
                );
              })}
            <RatingPopUp
              ratedService_id={ratedService_id}
              isRatingVisible={isRatingVisible}
              ratedCompany_id={ratedCompany_id}
              user_id={user_id}
              handleHideRating={handleHideRating}
            />
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  translateX: translateXTabTwo,
                },
                {
                  translateY: -translateY,
                },
              ],
            }}
          >
            {doneServices.length > 0 &&
              doneServices.map((service) => {
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
                              source={Images.CarWorkshop}
                              style={styles.itemPicture}
                            />
                            <View style={{ paddingLeft: 10 }}>
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
                                  "DD-MM-YYYY"
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
                            <View style={[styles.iconSection]}>
                              <AntDesign
                                name="star"
                                size={18}
                                color={Theme.COLORS.GRADIENT_END}
                              />
                              <Paragraph style={styles.paragraph}>
                                {service.rating != null
                                  ? service.rating.rating_value.toFixed(1)
                                  : "Not rated yet"}
                              </Paragraph>
                            </View>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </View>
                );
              })}
          </Animated.View>
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

  itemPicture: {
    width: width * 0.25,
    height: height * 0.1,
    borderRadius: 8,
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
  },
  ratingView: {
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
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: Theme.COLORS.STEELBLUE,
  },
  buttonIcon: {
    fontSize: 15,
    fontWeight: "bold",
    color: Theme.COLORS.STEELBLUE,
  },
  paragraphAddress: {
    paddingLeft: 5,
    fontSize: 14,
    color: "#D3D3D3",
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
  tabs: {},
});
