import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import DateTimePicker from "@react-native-community/datetimepicker";
import ajax from "../services/UserServices";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

function ProviderService({ route, navigation }) {
  const { height, width } = Dimensions.get("screen");
  const buttonTextStyle = {
    color: "#393939",
  };
  return (
    <>
      <ScreenHeader title="List of Services" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, marginTop: "25%" }}
      >
        <View>
          <ProgressSteps>
            <ProgressStep
              label="Accepted"
              nextBtnTextStyle={buttonTextStyle}
              //previousBtnTextStyle={buttonTextStyle}
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 1!</Text>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Picked Up"
              nextBtnTextStyle={buttonTextStyle}
              //previousBtnTextStyle={buttonTextStyle}
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 2!</Text>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Working On ..."
              nextBtnTextStyle={buttonTextStyle}
              //previousBtnTextStyle={buttonTextStyle}
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Done"
              nextBtnTextStyle={buttonTextStyle}
              //previousBtnTextStyle={buttonTextStyle}
            >
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 4!</Text>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </ScrollView>
    </>
  );
}

export default ProviderService;
