import React, { useState } from "react";
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import { AuthContext } from "../components/Context";
import ajax from "../services/UserServices";
import Theme from "../../constants/Theme";
import Images from "../../constants/Images";

const { width, height } = Dimensions.get("screen");

function Registration({ route, navigation }) {
  const { role } = route.params;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const { SignUp } = React.useContext(AuthContext);

  const registerUser = async () => {
    let data = await ajax.register(role, firstName, lastName, email, password);
    SignUp(data.user_id, data.role, data.token);
  };

  return (
    <ImageBackground
      source={Images.RegisterBackground}
      style={{ width, height, zIndex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.registerContainer}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <View style={styles.header}>
              <Text style={{ color: "#8898AA", fontSize: 14 }}>
                {role == "user" ? "User Sign Up" : "Service Provider Sign Up"}
              </Text>
            </View>
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <TextInput
                  placeholder="Email"
                  style={styles.textInput}
                  value={email}
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              <View style={styles.textContainer}>
                <TextInput
                  placeholder="First Name"
                  style={styles.textInput}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
              </View>

              <View style={styles.textContainer}>
                <TextInput
                  placeholder="Last Name"
                  style={styles.textInput}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                />
              </View>

              <View style={styles.textContainer}>
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  type="password"
                  value={password}
                  autoCapitalize="none"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.container}>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => registerUser()}
              >
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
              </TouchableOpacity>
              <View style={{ paddingTop: 5 }}>
                <TouchableOpacity
                  onPress={() => navigation.push("Signin")}
                  style={styles.createButton2}
                >
                  <Text style={styles.buttonText2}>SIGN IN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Registration;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 80,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#f4f5f7",
    borderRadius: 4,
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  createButton: {
    width: width * 0.8,
    marginTop: 25,
    alignItems: "center",
    backgroundColor: Theme.COLORS.PRIMARY,
    padding: 10,
    borderRadius: 20,
  },
  createButton2: {
    width: width * 0.8,
    //marginTop: 10,
    alignItems: "center",
    backgroundColor: Theme.COLORS.WHITE,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.COLORS.PRIMARY,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Theme.COLORS.WHITE,
  },
  buttonText2: {
    fontSize: 14,
    fontWeight: "bold",
    color: Theme.COLORS.PRIMARY,
  },
  textContainer: {
    width: width * 0.8,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: width * 0.8,
    height: 40,
    paddingLeft: 15,
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: 20,
  },
});
