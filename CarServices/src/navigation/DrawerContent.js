import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Profile from "../screens/Profile";
import RequestService from "../screens/RequestService";
import VProviderService from "../screens/ViewProviderService";
import UserService from "../screens/UserService";
import VUserService from "../screens/ViewUserService";
import Settings from "../screens/ProviderSetup";
import BookService from "../screens/BookService";
import Cars from "../screens/CarProfile";
import Addresses from "../screens/AddressBook";
import ChatScreen from "../screens/ChatScreen";
import Reminder from "../screens/Reminders";
import Home from "../screens/Home";
import HomeProvider from "../screens/HomeProvider";
import Main from "../screens/Main";
import Fillups from "../screens/FillUpScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import Badge from "../components/Badge";
import ProfileHeader from "../components/ProfileHeader";
import Images from "../../constants/Images";
import Themes from "../../constants/Theme";
import Theme from "../../constants/Theme";
const { height, width } = Dimensions.get("screen");

const Tabs = createBottomTabNavigator();
const UserStack = createStackNavigator();
const ProSettingStack = createStackNavigator();
const CarStack = createStackNavigator();
const AddressStack = createStackNavigator();
const UServiceStack = createStackNavigator();
const PServiceStack = createStackNavigator();
const ReminderStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Screens = createStackNavigator();
const HomeScreens = createStackNavigator();

export function DrawerContent(props) {
  const role = props.role;
  const user_id = props.user_id;
  const ProSettingStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <ProSettingStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ProSettingStack.Screen name="Settings" component={Settings.Setup} />
        <ProSettingStack.Screen
          name="Company Setup"
          component={Settings.CompanySetup}
          initialParams={{ user_id: user_id }}
        />
        <ProSettingStack.Screen
          name="Services Setup"
          component={Settings.ServiceSetup}
          initialParams={{ user_id: user_id }}
        />
        <ProSettingStack.Screen
          name="Add Service"
          component={Settings.addService}
          initialParams={{ user_id: user_id }}
        />
      </ProSettingStack.Navigator>
    );
  };

  const UserStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    //console.log("user" + user_id);
    return (
      <UserStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <UserStack.Screen
          name="Request Service"
          component={RequestService}
          initialParams={{ user_id: user_id }}
        />
        <UserStack.Screen
          name="User Service"
          component={UserService}
          initialParams={{ user_id: user_id }}
        />
        <UserStack.Screen
          name="Book Service"
          component={BookService}
          initialParams={{ user_id: user_id }}
        />
      </UserStack.Navigator>
    );
  };

  const CarStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <CarStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <CarStack.Screen
          name="Car Profile"
          component={Cars.CarProfile}
          initialParams={{ user_id: user_id }}
        />
        <CarStack.Screen
          name="Add New Car"
          component={Cars.AddCar}
          initialParams={{ user_id: user_id }}
        />
      </CarStack.Navigator>
    );
  };

  const AddressStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <AddressStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AddressStack.Screen
          name="My Addresses"
          component={Addresses.AddressBook}
          initialParams={{ user_id: user_id }}
        />
        <AddressStack.Screen
          name="Add Address"
          component={Addresses.AddAddress}
          initialParams={{ user_id: user_id }}
        />
      </AddressStack.Navigator>
    );
  };

  const ReminderStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <ReminderStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <ReminderStack.Screen
          name="Reminders"
          component={Reminder.Reminders}
          initialParams={{ user_id: user_id }}
        />
        <ReminderStack.Screen
          name="Set Reminder"
          component={Reminder.SetReminder}
          initialParams={{ user_id: user_id }}
        />
      </ReminderStack.Navigator>
    );
  };

  const UServiceStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <UServiceStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <UServiceStack.Screen
          name="View Services"
          component={VUserService.ViewUserService}
          initialParams={{ user_id: user_id }}
        />
        <UServiceStack.Screen
          name="View Services Detail"
          component={VUserService.ServiceDetail}
          initialParams={{ user_id: user_id }}
        />
        <UServiceStack.Screen
          name="Chat"
          component={ChatScreen}
          initialParams={{ user_id: user_id }}
        />
      </UServiceStack.Navigator>
    );
  };

  const PServiceStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <PServiceStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PServiceStack.Screen
          name="View Services"
          component={VProviderService.ViewUserService}
          initialParams={{ user_id: user_id }}
        />
        <PServiceStack.Screen
          name="View Services Detail"
          component={VProviderService.ServiceDetail}
          initialParams={{ user_id: user_id }}
        />
        <PServiceStack.Screen
          name="Chat"
          component={ChatScreen}
          initialParams={{ user_id: user_id }}
        />
      </PServiceStack.Navigator>
    );
  };

  const HomeScreenStackNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <HomeScreens.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeScreens.Screen
          name="Home"
          component={Home}
          initialParams={{ user_id: user_id }}
        />

        <HomeScreens.Screen
          name="Add Fill Up"
          component={Fillups.AddFillUpScreen}
          initialParams={{ user_id: user_id }}
        />
        <HomeScreens.Screen
          name="Fill Up"
          component={Fillups.FillUpScreen}
          initialParams={{ user_id: user_id }}
        />
        <HomeScreens.Screen
          name="Edit Fill Up"
          component={Fillups.EditFillUp}
          initialParams={{ user_id: user_id }}
        />

        <HomeScreens.Screen
          name="Add Expense"
          component={ExpenseScreen}
          initialParams={{ user_id: user_id }}
        />
      </HomeScreens.Navigator>
    );
  };
  const MainTabNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;
    return (
      <Tabs.Navigator
        shifting={false}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: Theme.COLORS.STEELBLUE,
          inactiveTintColor: "#778899",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Home") {
              return <FontAwesome name="home" size={size} color={color} />;
            }
            if (route.name === "Request Service") {
              return (
                <MaterialCommunityIcons
                  name="car-connected"
                  size={size}
                  color={color}
                />
              );
            }
            if (route.name === "View Services" && props.role == "user") {
              return (
                <Badge
                  name="clipboard-list"
                  size={size}
                  color={color}
                  user_id={props.user_id}
                />
              );
            }
            if (route.name === "Settings") {
              return (
                <MaterialIcons name="settings" size={size} color={color} />
              );
            }
          },
        })}
      >
        {props.role == "user" ? (
          <>
            <Tabs.Screen
              name="Home"
              component={HomeScreenStackNavigator}
              initialParams={{ user_id: user_id }}
            />
            <Tabs.Screen
              name="Request Service"
              component={UserStackNavigator}
              initialParams={{ user_id: user_id }}
            />

            <Tabs.Screen
              name="View Services"
              component={UServiceStackNavigator}
              initialParams={{ user_id: user_id }}
            />
          </>
        ) : (
          <>
            <Tabs.Screen
              name="Home"
              component={HomeProvider}
              initialParams={{ user_id: user_id }}
            />
            <Tabs.Screen
              name="Settings"
              component={ProSettingStackNavigator}
              initialParams={{ user_id: user_id }}
            />
            <Tabs.Screen
              name="View Services"
              component={PServiceStackNavigator}
              initialParams={{ user_id: user_id }}
            />
          </>
        )}
      </Tabs.Navigator>
    );
  };

  const ScreenNavigator = ({ navigation, route }) => {
    const { user_id } = route.params;

    return (
      <Screens.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screens.Screen
          name="Home"
          component={MainTabNavigator}
          initialParams={{ user_id: user_id }}
        />
        <Screens.Screen
          name="Profile"
          component={Profile}
          initialParams={{ user_id: user_id }}
        />

        <Screens.Screen
          name="Car Profile"
          component={CarStackNavigator}
          initialParams={{ user_id: user_id }}
        />
        <Screens.Screen
          name="Address Book"
          component={AddressStackNavigator}
          initialParams={{ user_id: user_id }}
        />

        <Screens.Screen
          name="Reminders"
          component={ReminderStackNavigator}
          initialParams={{ user_id: user_id }}
        />
        <Screens.Screen name="Sign Out" component={Main.SignOut} />
      </Screens.Navigator>
    );
  };

  const Contents = (props) => {
    return (
      <DrawerContentScrollView {...props} style={{ height: height }}>
        <ProfileHeader user_id={user_id} />
        <Divider />
        <DrawerItem
          label="Home"
          labelStyle={styles.labelStyle}
          onPress={() => props.navigation.navigate("Home")}
          icon={() => (
            <AntDesign name="home" color={Themes.COLORS.STEELBLUE} size={16} />
          )}
        />
        <DrawerItem
          label="Profile"
          labelStyle={styles.labelStyle}
          onPress={() => props.navigation.navigate("Profile")}
          icon={() => (
            <AntDesign name="user" color={Themes.COLORS.STEELBLUE} size={16} />
          )}
        />
        {role == "user" && (
          <>
            <DrawerItem
              label="Car Profile"
              labelStyle={styles.labelStyle}
              onPress={() => props.navigation.navigate("Car Profile")}
              icon={() => (
                <AntDesign
                  name="car"
                  color={Themes.COLORS.STEELBLUE}
                  size={16}
                />
              )}
            />
            <DrawerItem
              label="Address Book"
              labelStyle={styles.labelStyle}
              onPress={() => props.navigation.navigate("Address Book")}
              icon={() => (
                <FontAwesome
                  name="address-book-o"
                  color={Themes.COLORS.STEELBLUE}
                  size={16}
                />
              )}
            />
            <DrawerItem
              label="Reminders"
              labelStyle={styles.labelStyle}
              onPress={() => props.navigation.navigate("Reminders")}
              icon={() => (
                <MaterialCommunityIcons
                  name="bell-ring-outline"
                  color={Themes.COLORS.STEELBLUE}
                  size={16}
                />
              )}
            />
          </>
        )}

        <DrawerItem
          label="Sign Out"
          labelStyle={styles.labelStyle}
          onPress={() => props.navigation.navigate("Sign Out")}
          icon={() => (
            <FontAwesome
              name="sign-out"
              color={Themes.COLORS.STEELBLUE}
              size={16}
            />
          )}
        />
      </DrawerContentScrollView>
    );
  };

  // const [progress, setProgress] = useState(new Animated.Value(0));
  // const scale = Animated.interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  // });
  // const borderRadius = Animated.interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 10],
  // });

  // const screensStyles = {
  //   borderRadius,
  //   transform: [{ scale }],
  //   overflow: "hidden",
  //   flex: 1,
  // };

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: "60%",
        backgroundColor: Themes.COLORS.WHITE,
        height: height,
      }}
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      drawerContent={(props) => (
        //setProgress(props.progress);
        <Contents {...props} />
      )}
    >
      <Drawer.Screen
        name="Screens"
        component={ScreenNavigator}
        initialParams={{ user_id: props.user_id }}
      />
      {/* {(props) => <ScreenNavigator {...props} styles={screensStyles} />} */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 62,
    borderWidth: 0,
  },
  labelStyle: {
    marginLeft: -15,
    color: Themes.COLORS.STEELBLUE,
    fontSize: 14,
  },
});
