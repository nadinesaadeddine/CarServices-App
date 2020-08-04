import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";
import { AuthContext } from "../components/Context";

const { height, width } = Dimensions.get("screen");

function LoadPage() {
  return (
    <ImageBackground
      source={Images.RegisterBackground}
      style={{ height, width, zIndex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    </ImageBackground>
  );
}

function SignOut() {
  const { LogOut } = React.useContext(AuthContext);
  useEffect(() => {
    LogOut();
  });
  return <View></View>;
}

function Main({ navigation }) {
  return (
    <ImageBackground
      source={Images.Onboarding}
      style={{ height, width, zIndex: 1 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() =>
            navigation.navigate("Registration", { role: "provider" })
          }
        >
          <Text style={styles.buttonText}>Sign Up as a Provider</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("Registration", { role: "user" })}
        >
          <Text style={styles.buttonText}>Sign Up as a User</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  createButton: {
    width: width * 0.8,
    marginTop: 25,
    alignItems: "center",
    backgroundColor: Theme.COLORS.SECONDARY,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Theme.COLORS.PRIMARY,
  },
});

export default {
  Main,
  SignOut,
  LoadPage,
};
