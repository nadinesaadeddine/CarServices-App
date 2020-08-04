import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { DotsMenuModal } from "../components/DotsMenuModal";
import { ScreenHeader } from "../components/ScreenHeader";
import { TextInput } from "react-native-paper";
import PageLoader from "../components/PageLoader";
import ajax from "../services/AddressServices";
import ViewMaps from "../components/ViewMaps";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

function AddressBook({ route, navigation }) {
  const { user_id } = route.params;
  const [Addresses, setAddresses] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showId, setShowId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAdd = () => {
    navigation.navigate("Add Address", {
      user_id,
      addNew: 1,
    });
  };

  const getAllAddressesByUser = async () => {
    let data = await ajax.getAddressesByUser(user_id);
    setAddresses(data);
    setIsLoading(false);
  };

  const handleIconMenu = (address_id) => {
    setModalVisible(!isModalVisible);
    setShowId(address_id);
  };

  const getEdit = (id) => {
    navigation.navigate("Add Address", {
      user_id,
      addNew: 0,
    });
  };

  const getDelete = async (id) => {
    let data = await ajax.deleteAddress(id);
    getAllAddressesByUser();
    alert("address deleted");
  };
  // useEffect(() => {
  //   getAllAddressesByUser();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllAddressesByUser();
    }, [])
  );

  return (
    <>
      <ScreenHeader
        title="My Addresses"
        showAddIcon="1"
        handleAdd={handleAdd}
      />

      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, backgroundColor: Theme.COLORS.GHOSTWHITE, flex: 1 }}
        >
          {Addresses.length > 0 &&
            Addresses.map((address) => {
              return (
                <View key={address.id}>
                  <View style={styles.mainSection}>
                    <View style={styles.titleSection}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.iconRound}>
                          <Entypo name="address" size={18} color="orangered" />
                        </View>
                        <View
                          style={{ flexDirection: "column", paddingLeft: 5 }}
                        >
                          <Text style={styles.textTile}>
                            {address.saved_as}
                          </Text>
                          <Text style={styles.textDetail}>
                            {address.street_name}, {address.building_name},
                            {" " + address.house_no}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.iconSection}>
                      <View>
                        {isModalVisible && showId == address.id && (
                          <DotsMenuModal
                            id={address.id}
                            getEdit={getEdit}
                            getDelete={getDelete}
                            showEdit="1"
                            showDelete="1"
                          />
                        )}
                      </View>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        color="#D3D3D3"
                        onPress={() => handleIconMenu(address.id)}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
}

function AddressModal(props) {
  const [Address, setAddress] = useState({
    user_id: props.user_id,
    location: null,
    longitude: 0,
    latitude: 0,
    house_no: null,
    building_name: null,
    street_name: null,
    extra_notes: null,
    saved_as: null,
  });

  const handleSaveAddress = async () => {
    let data = await ajax.saveAddress(Address);
    alert("address saved");
    props.navigation.navigate("My Addresses", { user_id: props.user_id });
  };

  useEffect(() => {
    setAddress({
      ...Address,
      longitude: props.coordinate.longitude,
      latitude: props.coordinate.latitude,
    });
  }, [props.coordinate]);

  return (
    <Modal
      isVisible={props.isModalVisible}
      style={{
        width: width,
        flex: 1,
        position: "absolute",
        left: -17,
        bottom: -17,
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          top: -15,
          paddingLeft: width * 0.45,
        }}
      >
        <TouchableOpacity onPress={props.handleHideModal}>
          <View
            style={{
              backgroundColor: Theme.COLORS.STEELBLUE,
              width: 30,
              borderRadius: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="close" size={30} color={Theme.COLORS.WHITE} />
          </View>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            width: width,
            paddingHorizontal: 10,
            paddingVertical: 10,
            // height: height * 0.7,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,

            backgroundColor: Theme.COLORS.WHITE,
          }}
        >
          <TextInput
            label="House No"
            style={styles.textInput}
            theme={{
              colors: {
                primary: Theme.COLORS.STEELBLUE,
                underlineColor: Theme.COLORS.STEELBLUE,
              },
            }}
            value={Address.house_no}
            onChangeText={(house_no) => {
              setAddress({ ...Address, house_no });
            }}
          />

          <TextInput
            label="Building"
            theme={{
              colors: {
                primary: Theme.COLORS.STEELBLUE,
                underlineColor: Theme.COLORS.STEELBLUE,
              },
            }}
            style={styles.textInput}
            value={Address.building_name}
            onChangeText={(building_name) => {
              setAddress({ ...Address, building_name });
            }}
          />

          <TextInput
            label="Area/Street"
            theme={{
              colors: {
                primary: Theme.COLORS.STEELBLUE,
                underlineColor: Theme.COLORS.STEELBLUE,
              },
            }}
            style={styles.textInput}
            value={Address.street_name}
            onChangeText={(street_name) => {
              setAddress({ ...Address, street_name });
            }}
          />

          <TextInput
            label="Extra Notes"
            theme={{
              colors: {
                primary: Theme.COLORS.STEELBLUE,
                underlineColor: Theme.COLORS.STEELBLUE,
              },
            }}
            style={styles.textInput}
            value={Address.extra_notes}
            multiline={true}
            onChangeText={(extra_notes) => {
              setAddress({ ...Address, extra_notes });
            }}
          />

          <TextInput
            label="Saved as"
            theme={{
              colors: {
                primary: Theme.COLORS.STEELBLUE,
                underlineColor: Theme.COLORS.STEELBLUE,
              },
            }}
            style={styles.textInput}
            value={Address.saved_as}
            onChangeText={(saved_as) => {
              setAddress({ ...Address, saved_as });
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => handleSaveAddress()}
            >
              <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function AddAddress({ route, navigation }) {
  const { user_id } = route.params;
  const { addNew } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [UserLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const getUserLocation = (location) => {
    setUserLocation({
      ...UserLocation,
      longitude: location.longitude,
      latitude: location.latitude,
    });
  };

  const handleConfirm = () => {
    setModalVisible(true);
    // console.log(UserLocation);
  };

  const handleHideModal = () => {
    setModalVisible(false);
  };

  let showSaveIcon = 1;
  return (
    <>
      <ScreenHeader title="Add Address" />
      <View style={styles.mapSection}>
        <ViewMaps
          style={styles.mapStyle}
          getUserLocation={getUserLocation}
          coordinate={{
            latitude: UserLocation.latitude,
            longitude: UserLocation.longitude,
          }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => handleConfirm()}
        >
          <Text style={styles.buttonText}>Confirm Location & Proceed</Text>
        </TouchableOpacity>
      </View>

      <AddressModal
        handleHideModal={handleHideModal}
        isModalVisible={isModalVisible}
        user_id={user_id}
        coordinate={{
          latitude: UserLocation.latitude,
          longitude: UserLocation.longitude,
        }}
        navigation={navigation}
      />
    </>
  );
}
export default {
  AddressBook,
  AddAddress,
  AddressModal,
};

const styles = StyleSheet.create({
  mainSection: {
    width: width,
    backgroundColor: "#FFF5EE",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 0.5,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleSection: {
    flex: 2,
    flexDirection: "column",
    paddingLeft: 10,
  },

  iconSection: {
    //flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },
  textTile: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.COLORS.STEELBLUE,
  },
  textDetail: {
    fontSize: 14,
    color: Theme.COLORS.STEELBLUE,
  },

  mapSection: {
    flex: 2,
  },
  mapStyle: {
    width: width,
    height: height,
  },
  container: {
    position: "absolute",
    bottom: 5,
    left: width * 0.1,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    width: width * 0.8,
    alignItems: "center",
    backgroundColor: Theme.COLORS.STEELBLUE,
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Theme.COLORS.WHITE,
  },
  textInput: {
    width: width * 0.9,
    height: 60,
    paddingLeft: 6,
    fontSize: 14,
    backgroundColor: Theme.COLORS.WHITE,
  },
  iconRound: {
    borderWidth: 1,
    borderColor: "#FFFAFA",
    borderRadius: 30,
    backgroundColor: "#FFFAFA",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DCDCDC",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
});
