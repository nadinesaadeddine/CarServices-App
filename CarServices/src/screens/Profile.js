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
  Picker,
} from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Fontisto,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { ScreenHeader } from "../components/ScreenHeader";
import PageLoader from "../components/PageLoader";
import config from "../../config/config";
import ajax from "../services/UserServices";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");
const URI = config.URI;

function Profile({ route, navigation }) {
  const { user_id } = route.params;
  const [isEdit, setEdit] = useState(false);
  const [imgProfile, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({
    user_id: user_id,
    first_name: null,
    last_name: null,
    phone_number: null,
    birthday: null,
    gender: null,
    email: null,
    thumbnail: null,
  });
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const getProfile = async () => {
    let data = await ajax.getUser(user.user_id);

    if (data != "") {
      setUser({
        ...user,
        user_id: user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        birthday: data.birthday,
        gender: data.gender,
        email: data.email,
        thumbnail: data.thumbnail ? URI + "/" + data.thumbnail : null,
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    let data = await ajax.updateUser(user);
    if (data != "") {
      setUser({
        ...user,
        user_id: user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        birthday: data.birthday,
        gender: data.gender,
        email: data.email,
        thumbnail: data.thumbnail ? URI + "/" + data.thumbnail : null,
      });
      setEdit(false);
    }
  };

  const handleEdit = () => {
    setEdit(true);
  };

  useEffect(() => {
    getProfile();
  }, []);

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
      setUser({ ...user, birthday: newDate });
    }
  };
  const showDatepicker = () => {
    setShow(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      setUser({ ...user, thumbnail: result.uri });
    }
  };

  let showEditIcon = isEdit ? 0 : "1";
  return (
    <View style={styles.profile}>
      <ImageBackground
        source={Images.RegisterBackground}
        style={styles.profileContainer}
        imageStyle={styles.RegisterBackground}
      >
        <ScreenHeader
          title="Profile"
          showEditIcon={showEditIcon}
          handleEdit={handleEdit}
        />
        {isLoading ? (
          <PageLoader />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
            <View style={styles.profileCard}>
              <TouchableOpacity>
                <View style={styles.avatarContainer}>
                  <Image
                    source={
                      user.thumbnail
                        ? {
                            uri: user.thumbnail,
                          }
                        : user.gender == "female"
                        ? Images.FemaleProfilePicture
                        : Images.ProfilePicture
                    }
                    style={styles.avatar}
                  />
                </View>
                {isEdit && (
                  <View style={styles.photoIcon}>
                    <Fontisto
                      name="camera"
                      color={Theme.COLORS.STEELBLUE}
                      size={18}
                      onPress={pickImage}
                    />
                  </View>
                )}
              </TouchableOpacity>
              {isEdit ? (
                <View>
                  <View style={styles.textContainer}>
                    <TextInput
                      label="First Name"
                      theme={{
                        colors: {
                          primary: Theme.COLORS.STEELBLUE,
                          underlineColor: Theme.COLORS.STEELBLUE,
                          text: Theme.COLORS.STEELBLUE,
                        },
                      }}
                      style={styles.textInput}
                      value={user.first_name}
                      onChangeText={(first_name) =>
                        setUser({ ...user, first_name })
                      }
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <TextInput
                      label="Last Name"
                      theme={{
                        colors: {
                          primary: Theme.COLORS.STEELBLUE,
                          underlineColor: "transparent",
                          text: Theme.COLORS.STEELBLUE,
                        },
                      }}
                      style={styles.textInput}
                      value={user.last_name}
                      onChangeText={(last_name) =>
                        setUser({ ...user, last_name })
                      }
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={{ fontSize: 12, color: "grey", paddingLeft: 15 }}
                    >
                      Birthday
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 5,
                      }}
                    >
                      <Text style={styles.birthdayText}>
                        {moment(new Date(user.birthday)).format("DD MMM YYYY")}
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
                      value={user.phone_number}
                      onChangeText={(phone_number) =>
                        setUser({ ...user, phone_number })
                      }
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Picker
                      selectedValue={user.gender}
                      style={{
                        height: 50,
                        width: 150,
                        color: Theme.COLORS.STEELBLUE,
                        fontSize: 12,
                      }}
                      onValueChange={(itemValue) =>
                        setUser({ ...user, gender: itemValue })
                      }
                    >
                      <Picker.Item label="Gender" value="" />
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                    </Picker>
                  </View>
                  <View style={styles.container}>
                    <TouchableOpacity
                      style={styles.createButton}
                      onPress={() => handleSave()}
                    >
                      <Text style={styles.buttonText}>UPDATE PROFILE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.iconSection}>
                    <View style={styles.iconRound}>
                      <FontAwesome
                        name="user-circle"
                        size={18}
                        color="#FF6347"
                      />
                    </View>
                    <Text style={styles.textStyle}>
                      {user.first_name + " " + user.last_name}
                    </Text>
                  </View>
                  <View style={styles.iconSection}>
                    <View style={styles.iconRound}>
                      <MaterialIcons name="email" size={18} color="#FF6347" />
                    </View>
                    <Text style={styles.textStyle}>{user.email}</Text>
                  </View>
                  <View style={styles.iconSection}>
                    <View style={styles.iconRound}>
                      <FontAwesome name="phone" size={18} color="#FF6347" />
                    </View>
                    <Text style={styles.textStyle}>{user.phone_number}</Text>
                  </View>
                  <View style={styles.iconSection}>
                    <View style={styles.iconRound}>
                      <FontAwesome
                        name="birthday-cake"
                        size={18}
                        color="#FF6347"
                      />
                    </View>
                    <Text style={styles.textStyle}>
                      {moment(new Date(user.birthday)).format("DD MMMM YYYY")}
                    </Text>
                  </View>
                  <View style={styles.iconSection}>
                    <View style={styles.iconRound}>
                      {user.gender == "female" ? (
                        <MaterialCommunityIcons
                          name="gender-female"
                          size={18}
                          color="#FF6347"
                        />
                      ) : user.gender == "male" ? (
                        <MaterialCommunityIcons
                          name="gender-male"
                          size={18}
                          color="#FF6347"
                        />
                      ) : (
                        <FontAwesome
                          name="genderless"
                          size={18}
                          color="#FF6347"
                        />
                      )}
                    </View>
                    <Text style={styles.textStyle}>{user.gender}</Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  profile: {
    flex: 1,
  },
  RegisterBackground: {
    height: height / 2,
  },
  profileCard: {
    padding: 30,
    marginHorizontal: 20,
    marginTop: 60,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: Theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    height: height,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
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
    alignItems: "center",
    backgroundColor: Theme.COLORS.STEELBLUE,
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 14,
    color: Theme.COLORS.WHITE,
    fontWeight: "bold",
  },
  photoIcon: {
    alignItems: "flex-end",
    marginHorizontal: 80,
    marginTop: -15,
  },
  birthdayText: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    width: width - 100,
    paddingLeft: 15,
    color: Theme.COLORS.STEELBLUE,
  },
  textStyle: {
    fontSize: 16,
    paddingLeft: 10,
    color: Theme.COLORS.STEELBLUE,
  },
  iconSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconRound: {
    borderWidth: 1,
    borderColor: "#FFFAFA",
    borderRadius: 30,
    backgroundColor: "#FFFAFA",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DCDCDC",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
});
