import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

export function ServiceList(props) {
  const user_id = props.user_id;
  const services = props.services;

  return (
    <View>
      {services.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{ backgroundColor: Theme.COLORS.WHITE }}
          onPress={(id, name) => props.handleList(item.id, item.name)}
        >
          <View style={styles.mainSection}>
            <View style={styles.subSection}>
              {item.icon_library == "MaterialCommunityIcons" ? (
                <MaterialCommunityIcons
                  name={item.service_icon}
                  size={20}
                  color={Theme.COLORS.GRADIENT_END}
                />
              ) : (
                <Ionicons
                  name={item.service_icon}
                  size={20}
                  color={Theme.COLORS.GRADIENT_END}
                />
              )}
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textSection}>{item.name}</Text>
              </View>
            </View>
            <View style={styles.endSection}>
              <AntDesign name="right" size={24} color="#DCDCDC" />
            </View>
          </View>
          <Divider />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  subSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 2,
  },
  textSection: {
    color: "#4682B4",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 6,
    lineHeight: 20,
    paddingLeft: 15,
  },
  endSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    right: 0,
    flex: 1,
  },
});
