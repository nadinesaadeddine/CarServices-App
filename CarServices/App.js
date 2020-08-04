import React, { useEffect } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./src/components/Context";
import Main from "./src/screens/Main";
import SignIn from "./src/screens/SignIn";
import Registration from "./src/screens/Registration";
import { DrawerContent } from "./src/navigation/DrawerContent";

console.disableYellowBox = true;
const Stack = createStackNavigator();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    api_token: null,
    user_id: null,
    role: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          api_token: action.token,
          isLoading: false,
          user_id: action.id,
          role: action.userRole,
        };
      case "LOGIN":
        return {
          ...prevState,
          api_token: action.token,
          user_id: action.id,
          role: action.userRole,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          api_token: action.token,
          user_id: action.id,
          role: action.userRole,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          api_token: action.token,
          user_id: action.id,
          role: action.userRole,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const authContext = React.useMemo(
    () => ({
      LogIn: async (user_id, user_role, user_token) => {
        try {
          await AsyncStorage.setItem("user_id", JSON.stringify(user_id));
          await AsyncStorage.setItem("role", JSON.stringify(user_role));
          await AsyncStorage.setItem("api_token", JSON.stringify(user_token));
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          id: user_id,
          userRole: user_role,
          token: user_token,
        });
      },
      LogOut: async () => {
        let user_id, user_role, user_token;
        try {
          await AsyncStorage.removeItem("user_id");
          await AsyncStorage.removeItem("role");
          await AsyncStorage.removeItem("api_token");
          user_id = null;
          user_role = null;
          user_token = null;
        } catch (e) {
          console.log(e);
        }

        dispatch({
          type: "LOGOUT",
          id: user_id,
          userRole: user_role,
          token: user_token,
        });
      },
      SignUp: async (user_id, user_role, user_token) => {
        try {
          await AsyncStorage.setItem("user_id", JSON.stringify(user_id));
          await AsyncStorage.setItem("role", JSON.stringify(user_role));
          await AsyncStorage.setItem("api_token", JSON.stringify(user_token));
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "REGISTER",
          id: user_id,
          userRole: user_role,
          token: user_token,
        });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let user_id, role, api_token;
      user_id = null;
      role = null;
      api_token = null;
      try {
        user_id = await AsyncStorage.getItem("user_id");
        role = JSON.parse(await AsyncStorage.getItem("role"));
        api_token = JSON.parse(await AsyncStorage.getItem("api_token"));
      } catch (e) {
        console.log(e);
      }

      dispatch({
        type: "RETRIEVE_TOKEN",
        id: user_id,
        userRole: role,
        token: api_token,
      });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <Main.LoadPage />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.api_token == null ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Signin" component={SignIn} />
            <Stack.Screen name="Main" component={Main.Main} />
            <Stack.Screen name="Registration" component={Registration} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <DrawerContent role={loginState.role} user_id={loginState.user_id} />
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
}
