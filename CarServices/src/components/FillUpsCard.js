import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

export function FillUpsCard(props) {
  const fillups = props.fillups;

  return (
    <>
      {fillups.map((fillup) => {
        return (
          <View key={fillup.id}>
            <TouchableOpacity onPress={(id) => props.editFillUp(fillup.id)}>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.fillupIcon}>
                  <MaterialCommunityIcons
                    name="fuel"
                    size={20}
                    color={Theme.COLORS.WHITE}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingLeft: 10,
                  }}
                >
                  <View style={{ flexDirection: "column", width: 100 }}>
                    <Text style={styles.paragraph}>
                      {moment(new Date(fillup.fill_date)).format("DD MMM YYYY")}
                    </Text>
                    <Text style={styles.paragraph}>Odo: {fillup.odometer}</Text>
                  </View>
                  <View style={{ flexDirection: "column", width: 100 }}>
                    <Text style={styles.paragraph}>{fillup.quantity} Ltr</Text>
                    <Text style={styles.paragraph}>
                      (+
                      {fillup.distanceInKm == null ? "0" : fillup.distanceInKm})
                      km
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", width: 100 }}>
                    <Text style={styles.paragraph}>{fillup.totalcost} LL</Text>
                    <Text style={styles.paragraph}>
                      {fillup.kml_number == null
                        ? "n/a"
                        : fillup.kml_number + " KPL"}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  fillupIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    paddingLeft: 5,
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE, //Theme.COLORS.WHITE,
  },
});
