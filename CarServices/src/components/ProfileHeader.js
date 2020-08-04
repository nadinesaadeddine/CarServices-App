import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import ajax from "../services/UserServices";
import Theme from "../../constants/Theme";
import Images from "../../constants/Images";
import config from "../../config/config";

const URI = config.URI;

export default function ProfileHeader(props) {
  const user_id = props.user_id;
  const [user, setUser] = useState({
    user_id: user_id,
    first_name: null,
    last_name: null,
    gender: null,
    thumbnail: null,
  });

  const getProfile = async () => {
    let data = await ajax.getUser(user.user_id);

    if (data != "") {
      setUser({
        ...user,
        user_id: user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        thumbnail: data.thumbnail ? URI + "/" + data.thumbnail : null,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View>
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: Theme.COLORS.STEELBLUE,
          }}
        >
          {user.first_name + " " + user.last_name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 62,
    borderWidth: 0,
  },
  labelStyle: {
    marginLeft: -15,
    color: Theme.COLORS.STEELBLUE,
    fontSize: 14,
  },
});
