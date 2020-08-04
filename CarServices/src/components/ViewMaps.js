import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import Theme from "../../constants/Theme";
const { height, width } = Dimensions.get("screen");

function ViewMaps(props) {
  const deltas = {
    latitudeDelta: 0.0001,
    longitudeDelta: 0.01,
  };

  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChangedUserLocation = (coordinate) => {
    let newRegion = {
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
    };
    setRegion({
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
      ...deltas,
    });

    //console.log(region);
    props.getUserLocation(newRegion, locationName);
  };

  const getGeocode = async (lat, long) => {
    // console.log({
    //   latitude: lat,
    //   longitude: long,
    // });

    let locname = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });
    // console.log(locname);
    if (locname.length > 0) {
      setLocationName(locname[0].name + ", " + locname[0].city);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    //Location.setApiKey("AIzaSyBLCkb3gOzGM1IiUpb0UY8hkDj8xYOvHK4");
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas,
    };

    setRegion(region);
    setLoading(false);
    handleChangedUserLocation(region);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    (() => {
      // console.log("map");
      // console.log(props.coordinate.latitude);
      // console.log(props.coordinate.longitude);
      if (props.coordinate.latitude == 0 && props.coordinate.longitude == 0) {
        getCurrentLocation();
      } else {
        let region = {
          latitude: props.coordinate.latitude,
          longitude: props.coordinate.longitude,
          ...deltas,
        };
        setRegion(region);
        // console.log("region");
        // console.log(region);
        setLoading(false);
        getGeocode(props.coordinate.latitude, props.coordinate.longitude);
      }
    })();
  }, [props.coordinate]);

  if (isLoading) return <MapView style={props.style} />;
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", paddingLeft: 5 }}>
          <MaterialIcons
            name="my-location"
            size={20}
            color={Theme.COLORS.ORANGERED}
          />
          <Text
            style={{
              height: 40,
              width: width * 0.9,
              color: Theme.COLORS.STEELBLUE,
              fontWeight: "700",
              paddingLeft: 10,
            }}
          >
            {locationName}
          </Text>
        </View>
      </View>
      <MapView style={props.style} region={region}>
        <Marker
          draggable
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          onDragEnd={(e) => handleChangedUserLocation(e.nativeEvent.coordinate)}
          title="Your Location"
        >
          <Entypo name="location-pin" size={32} color="red" />
        </Marker>
        {props.multipleMarkers &&
          props.multipleMarkers.length > 0 &&
          props.multipleMarkers.map((marker) => {
            return (
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                key={marker.id}
                title={marker.name}
              >
                <FontAwesome name="map-pin" size={26} color="red" />
              </Marker>
            );
          })}
      </MapView>
    </>
  );
}

export default ViewMaps;

const styles = StyleSheet.create({
  mapStyle: {
    width: width,
    height: height * 0.3,
  },
});
