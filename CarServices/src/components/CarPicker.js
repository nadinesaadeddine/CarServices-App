import React, { useState, useEffect } from "react";
import { View, Picker, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ajax from "../services/CarServices";
import Theme from "../../constants/Theme";
const { height, width } = Dimensions.get("screen");

function CarPicker(props) {
  const [Cars, setCars] = useState([]);

  const getCars = async () => {
    let data = await ajax.getCarsByUser(props.user_id);
    setCars(data);
  };

  useEffect(() => {
    getCars();
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

      <Picker
        selectedValue={props.car_id}
        style={styles.pickerSection}
        onValueChange={(itemValue) => props.handleChangedCar(itemValue)}
      >
        {Cars.length > 0 ? (
          Cars.map((car) => {
            return (
              <Picker.Item label={car.car_make} value={car.id} key={car.id} />
            );
          })
        ) : (
          <Picker.Item label="" value="" />
        )}
      </Picker>
    </View>
  );
}

export default CarPicker;

const styles = StyleSheet.create({
  mainSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
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
  iconSection: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.COLORS.GRADIENT_END,
    borderRadius: 20,
    width: 25,
    height: 25,
  },
  pickerSection: {
    height: 50,
    width: width - 30,
    color: Theme.COLORS.STEELBLUE,
    fontWeight: "700",
    fontSize: 20,
  },
});
