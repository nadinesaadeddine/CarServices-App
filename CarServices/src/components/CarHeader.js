import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ajax from "../services/CarServices";
import Theme from "../../constants/Theme";
const { height, width } = Dimensions.get("screen");

function CarHeader(props) {
  const [Car, setCar] = useState({ car_id: props.car_id, car_make: "" });

  const getCar = async () => {
    let data = await ajax.getCarsById(props.car_id);
    setCar({ car_id: props.car_id, car_make: data.car_make });
  };

  useEffect(() => {
    getCar();
  }, []);

  return (
    <View style={styles.mainSection}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={styles.iconSection}>
          <AntDesign name="car" size={16} color={Theme.COLORS.WHITE} />
        </View>
      </View>

      <Text style={styles.text}>{Car.car_make}</Text>
    </View>
  );
}

export default CarHeader;

const styles = StyleSheet.create({
  mainSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  iconSection: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.COLORS.GRADIENT_END,
    borderRadius: 20,
    width: 25,
    height: 25,
  },
  pickerSection: {},
  text: {
    paddingLeft: 5,
    color: Theme.COLORS.STEELBLUE,
    fontWeight: "700",
    fontSize: 18,
  },
});
