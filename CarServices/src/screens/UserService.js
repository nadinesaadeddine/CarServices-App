import React, { useState, useEffect, version } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Picker,
} from "react-native";
import { ScreenHeader } from "../components/ScreenHeader";
import ViewMaps from "../components/ViewMaps";
import { getDistance } from "geolib";
import config from "../../config/config";
import ajax from "../services/RequestServices";
import ajax2 from "../services/AddressServices";
import PageLoader from "../components/PageLoader";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");
const URI = config.URI;

function UserService({ route, navigation }) {
  const { service_id } = route.params;
  const { service_name } = route.params;
  const { user_id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [UserLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [locationName, setLocationName] = useState(null);
  const [providers, setProviders] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressInfo, setAddressInfo] = useState({
    address_id: null,
    full_address: "",
    longitude: 0,
    latitude: 0,
  });

  const getUserAddresses = async () => {
    let data = await ajax2.getAddressesByUser(user_id);
    //console.log(data);
    setAddresses(data);
  };

  const getAddressInfo = async (id) => {
    if (id != "") {
      let data = await ajax2.getAddressById(id);
      //console.log(data);
      setAddressInfo({
        ...addressInfo,
        address_id: id,
        full_address:
          data.street_name +
          "," +
          data.building_name +
          "," +
          data.house_no +
          "," +
          data.extra_notes,
        longitude: data.latitude,
        latitude: data.longitude,
      });
      // console.log("home");
      // console.log({
      //   longitude: data.longitude,
      //   latitude: data.latitude,
      // });
      setUserLocation({
        ...UserLocation,
        longitude: data.longitude,
        latitude: data.latitude,
      });
    } else {
      setAddressInfo({
        ...addressInfo,
        address_id: null,
        full_address: "",
        longitude: 0,
        latitude: 0,
      });
      getUserLocation({ longitude: 0, latitude: 0 });
    }
  };

  const _getDistance = (userLoc, providerLoc) => {
    let dis = getDistance(userLoc, providerLoc);
    //console.log(dis);
    return dis;
  };

  const getNearProviders = async () => {
    let data = await ajax.getNearProviderByService(service_id);
    if (data.length > 0) {
      data = data.filter(
        (provider) =>
          _getDistance(UserLocation, {
            latitude: provider.companies.latitude,
            longitude: provider.companies.longitude,
          }) <= 500
      );
    }
    setProviders(data);
    setIsLoading(false);
    data = await ajax.getProvidersCompaniesByService(service_id);

    if (data.length > 0) {
      data = data.filter(
        (provider) =>
          _getDistance(UserLocation, {
            latitude: provider.latitude,
            longitude: provider.longitude,
          }) <= 500
      );
    }
    setCompanies(data);
    //console.log("here");
  };

  const getUserLocation = (location, locationName) => {
    setUserLocation({
      ...UserLocation,
      longitude: location.longitude,
      latitude: location.latitude,
    });
    setLocationName(locationName);
  };

  const handleItems = (status, company_id, service_id) => {
    if (!status) {
      navigation.navigate("Book Service", {
        company_id,
        user_id,
        service_id,
        UserLocation,
        locationName,
        full_address: addressInfo.full_address,
      });
    }
  };

  useEffect(() => {
    getNearProviders();
    getUserAddresses();
  }, []);

  useEffect(() => {
    getNearProviders();
    getUserAddresses();
  }, [UserLocation]);

  return (
    <>
      <ScreenHeader title={service_name + " Service"} isBack="1" />

      <View style={styles.detectedLocation}>
        <FontAwesome
          name="location-arrow"
          size={20}
          color={Theme.COLORS.ORANGERED}
        />
        <Picker
          style={styles.addressPicker}
          selectedValue={addressInfo.address_id}
          onValueChange={(itemValue) => getAddressInfo(itemValue)}
        >
          <Picker.Item label="Detected Location" value="" />
          {addresses.length > 0 &&
            addresses.map((address) => {
              return (
                <Picker.Item
                  label={address.saved_as}
                  value={address.id}
                  key={address.id}
                />
              );
            })}
        </Picker>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, backgroundColor: Theme.COLORS.WHITE }}
      >
        <View style={styles.mapContainer}>
          <ViewMaps
            style={styles.mapStyle}
            getUserLocation={getUserLocation}
            coordinate={{
              latitude: UserLocation.latitude,
              longitude: UserLocation.longitude,
            }}
            multipleMarkers={companies}
          />
        </View>
        {isLoading ? (
          <PageLoader />
        ) : (
          <View style={styles.gridContainer}>
            {providers &&
              providers.map((provider) => {
                return (
                  <View
                    key={provider.companies.id}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        handleItems(
                          provider.companies.isClosed,
                          provider.companies.id,
                          service_id
                        )
                      }
                    >
                      <View style={styles.itemContainer}>
                        <View style={styles.pictureContainer}>
                          <Image
                            source={
                              provider.companies.company_image
                                ? {
                                    uri:
                                      URI +
                                      "/" +
                                      provider.companies.company_image,
                                  }
                                : Images.CarWorkshop
                            }
                            style={styles.itemPicture}
                          />
                        </View>
                        <View style={styles.mainSection}>
                          <View style={{ flex: 2 }}>
                            <Text style={styles.itemTitle}>
                              {provider.companies.name}
                            </Text>
                            <View
                              style={[
                                styles.iconSection,
                                { paddingVertical: 5 },
                              ]}
                            >
                              <MaterialIcons
                                name="location-on"
                                size={16}
                                color="#D3D3D3"
                              />
                              <Text style={styles.itemAddress}>
                                {provider.companies.address}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.detailSection}>
                            <View style={styles.iconSection}>
                              <AntDesign
                                name="star"
                                size={14}
                                color={Theme.COLORS.GRADIENT_END}
                              />
                              <Text style={styles.itemName}>4.0</Text>
                            </View>
                            <View style={styles.iconSection}>
                              <MaterialCommunityIcons
                                name="garage-open"
                                size={16}
                                color={Theme.COLORS.GRADIENT_END}
                              />
                              <Text style={styles.itemName}>
                                {provider.companies.isClosed
                                  ? "Closed"
                                  : "open"}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        )}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 25,
  },
  mapStyle: {
    width: width,
    height: height * 0.4,
  },
  gridContainer: {
    backgroundColor: Theme.COLORS.WHITE,
    width: width,
    paddingVertical: 5,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    //width: width * 0.9,
    backgroundColor: Theme.COLORS.WHITE,
    borderColor: "#D3D3D3",
    borderWidth: 0.5,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  mainSection: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 5,
  },
  detailSection: {
    flex: 1,
    flexDirection: "row",
  },
  iconSection: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.COLORS.STEELBLUE,
  },
  itemAddress: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D3D3D3",
    marginLeft: 5,
  },
  itemName: {
    fontSize: 14,
    color: Theme.COLORS.GRADIENT_END,
    marginLeft: 5,
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },

  pictureContainer: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  itemPicture: {
    width: width * 0.3,
    height: height * 0.13,
    borderRadius: 8,
  },
  detectedLocation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.COLORS.WHITE,
    paddingLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.COLORS.STEELBLUE,
    shadowColor: Theme.COLORS.STEELBLUE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  addressPicker: {
    width: width - 30,
    alignItems: "center",
    color: Theme.COLORS.STEELBLUE,
    fontWeight: "700",
    fontSize: 14,
    backgroundColor: Theme.COLORS.WHITE,
  },
});
export default UserService;
