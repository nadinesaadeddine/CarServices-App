import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import ajax from "../services/RequestServices";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { ScreenHeader } from "../components/ScreenHeader";
import PageLoader from "../components/PageLoader";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

function RequestService({ route, navigation }) {
  const { user_id } = route.params;
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetAllServices = async () => {
    let data = await ajax.getAllServices();
    //console.log(data);
    setServices(data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAllServices();
  }, []);

  const handleList = (service_id, service_name) => {
    navigation.navigate("User Service", { service_id, service_name, user_id });
  };

  return (
    <>
      <ScreenHeader title="Request Service" />
      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, backgroundColor: Theme.COLORS.WHITE, flex: 1 }}
        >
          <View>
            {services.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{ backgroundColor: Theme.COLORS.WHITE }}
                onPress={() => handleList(item.id, item.name)}
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
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
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
        </ScrollView>
      )}
    </>
  );
}

export default RequestService;
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
