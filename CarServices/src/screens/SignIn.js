import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ajax from "../services/UserServices";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";
import { AuthContext } from "../components/Context";

const { height, width } = Dimensions.get("screen");

function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [iconlogo, setIconLogo] = useState(new Animated.Value(0.01));
  const iconlogo = new Animated.Value(0.01);
  const { LogIn } = React.useContext(AuthContext);
  const [emailError, setEmailError] = useState(false);
  const validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  const loginUser = async () => {
    let isError = 0;
    if (email == "" || password == "") {
      isError = 1;
    } else {
      if (validateEmail(email)) isError = 0;
      else isError = 1;
    }
    if (isError == 0) {
      let data = await ajax.login(email, password);
      LogIn(data.user_id, data.role, data.token);
    } else {
      alert("no");
    }
  };

  // Animated.spring(iconlogo, {
  //   toValue: 1,
  //   tension: 10,
  //   friction: 2,
  //   duration: 1000,
  // }).start();

  useEffect(() => {
    Animated.spring(iconlogo, {
      toValue: 1,
      tension: 10,
      friction: 2,
      duration: 1000,
    }).start();
  }, []);
  return (
    <ImageBackground
      source={Images.RegisterBackground}
      style={{ width, height, zIndex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.registerContainer}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <View style={styles.iconStyle}>
                <Animated.View
                  style={{
                    opacity: iconlogo,
                    top: iconlogo.interpolate({
                      inputRange: [0, 1],
                      outputRange: [80, 0],
                    }),
                  }}
                >
                  <FontAwesome
                    name="car"
                    size={26}
                    color={Theme.COLORS.PRIMARY}
                  />
                </Animated.View>
              </View>
            </View>
            <View style={styles.header}>
              <Text style={{ color: "#8898AA", fontSize: 14 }}>Sign In</Text>
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
                onPress={() => loginUser()}
              >
                <Text style={styles.buttonText}>SIGN IN</Text>
              </TouchableOpacity>
              <View style={{ paddingTop: 5 }}>
                <TouchableOpacity
                  onPress={() => navigation.push("Main")}
                  style={styles.createButton2}
                >
                  <Text style={styles.buttonText2}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ImageBackground>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    height: 50,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.6,
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
    //marginTop: 10,
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
  iconStyle: {
    borderWidth: 1,
    backgroundColor: Theme.COLORS.WHITE,
    borderColor: Theme.COLORS.PRIMARY,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Theme.COLORS.PRIMARY,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 1,
  },
});
