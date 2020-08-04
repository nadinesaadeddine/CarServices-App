import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Picker,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScreenHeader } from "../components/ScreenHeader";
import { Card, Title, Paragraph, TextInput, Switch } from "react-native-paper";
import { DotsMenuModal } from "../components/DotsMenuModal";
import PageLoader from "../components/PageLoader";
import config from "../../config/config";
import ajax from "../services/CarServices";
import Images from "../../constants/Images";
import Theme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");
const URI = config.URI;
//Car Profile Screen
function CarProfile({ route, navigation }) {
  const { user_id } = route.params;
  const [Cars, setCars] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showId, setShowId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAdd = () => {
    navigation.navigate("Add New Car", {
      user_id,
      addNew: 1,
      editCar: 0,
      viewCar: 0,
      car_id: null,
    });
  };

  const getAllCarsByUser = async () => {
    let data = await ajax.getCarsByUser(user_id);
    setCars(data);
    setIsLoading(false);
    console.log("data");
    console.log(data);
  };

  const handleIconMenu = (car_id) => {
    setModalVisible(!isModalVisible);
    setShowId(car_id);
  };

  const getView = (id) => {
    navigation.navigate("Add New Car", {
      user_id,
      addNew: 0,
      editCar: 0,
      viewCar: 1,
      car_id: id,
    });
  };

  const getEdit = (id) => {
    navigation.navigate("Add New Car", {
      user_id,
      addNew: 0,
      editCar: 1,
      viewCar: 0,
      car_id: id,
    });
  };

  const getDelete = async (id) => {
    let data = await ajax.deleteCar(id);
    alert("car deleted");
  };

  useEffect(() => {
    getAllCarsByUser();
  }, []);

  return (
    <>
      <ScreenHeader title="Cars" showAddIcon="1" handleAdd={handleAdd} />
      {isLoading ? (
        <PageLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
          {Cars.length > 0 &&
            Cars.map((car) => {
              return (
                <View
                  key={car.id}
                  style={{ paddingVertical: 5, paddingHorizontal: 5 }}
                >
                  <Card style={styles.cardSection}>
                    <Card.Content>
                      <View style={styles.imageSection}>
                        <ImageBackground
                          source={
                            car.car_image
                              ? {
                                  uri: URI + "/" + car.car_image,
                                }
                              : Images.CarPicture
                          }
                          style={styles.carImage}
                          imageStyle={styles.imgStyle}
                        />
                      </View>
                      <View style={styles.mainSection}>
                        <View style={styles.titleSection}>
                          <Title style={styles.textStyle}>{car.car_make}</Title>
                          <Paragraph style={styles.textStyle}>
                            {car.car_model} {car.year}
                          </Paragraph>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Paragraph style={styles.textStyle}>
                              Set Default
                            </Paragraph>
                            <Switch
                              value={car.default_car}
                              color={Theme.COLORS.GRADIENT_END}
                            />
                          </View>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                          <View style={styles.iconSection}>
                            <MaterialCommunityIcons
                              name="dots-vertical"
                              size={30}
                              color="#D3D3D3"
                              onPress={() => handleIconMenu(car.id)}
                            />
                          </View>
                          {isModalVisible && showId == car.id && (
                            <View style={styles.modalSection}>
                              <DotsMenuModal
                                id={car.id}
                                getEdit={getEdit}
                                getDelete={getDelete}
                                showEdit="1"
                                showDelete="1"
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
              );
            })}
        </ScrollView>
      )}
    </>
  );
}

//Add New Car Screen
function AddCar({ route, navigation }) {
  const { user_id } = route.params;
  const { addNew } = route.params;
  const { editCar } = route.params;
  const { viewCar } = route.params;
  const { car_id } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const [carProfile, setCarProfile] = useState({
    user_id: user_id,
    car_id: car_id,
    car_make: null,
    car_model: null,
    fuel_type: "",
    year: null,
    license_number: null,
    insurance_no: null,
    extra_notes: null,
    default_car: 0,
    car_image: null,
  });

  const handleSave = async () => {
    let updateCar = 0;
    if (addNew) updateCar = 0;
    if (editCar) updateCar = 1;

    let data = await ajax.saveCar(carProfile, updateCar);

    alert("car saved");
    navigation.navigate("Car Profile", { user_id });
  };

  const getCarsById = async () => {
    let data = await ajax.getCarsById(car_id);
    console.log(data);
    setCarProfile({
      ...carProfile,
      user_id: user_id,
      car_id: car_id,
      car_make: data.car_make,
      car_model: data.car_model,
      fuel_type: data.fuel_type,
      year: data.year,
      license_number: data.license_number,
      insurance_no: data.insurance_no,
      extra_notes: data.extra_notes,
      default_car: data.default_car,
      car_image: data.car_image,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (car_id) {
      getCarsById();
    }
  }, []);

  let showSaveIcon = 1;
  let headerTitle = "Add Car";
  if (viewCar) {
    showSaveIcon = 0;
    headerTitle = "View Car";
  }

  if (editCar) headerTitle = "Edit Car";

  return (
    <>
      <ScreenHeader
        title={headerTitle}
        showSaveIcon={showSaveIcon}
        handleSave={handleSave}
      />
      {isLoading && addNew == 0 ? (
        <PageLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
          <ImageBackground
            source={
              carProfile.car_image
                ? {
                    uri: URI + "/" + carProfile.car_image,
                  }
                : Images.CarPicture
            }
            style={styles.carImage2}
            imageStyle={styles.carImage2}
          />
          <View
            style={{
              padding: 30,
              marginHorizontal: 5,
              marginTop: -30,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              backgroundColor: Theme.COLORS.WHITE,
            }}
          >
            <View style={styles.textContainer}>
              <TextInput
                label="Make"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={styles.textInput}
                value={carProfile.car_make}
                onChangeText={(car_make) => {
                  setCarProfile({ ...carProfile, car_make });
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <TextInput
                label="Model"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={styles.textInput}
                value={carProfile.car_model}
                onChangeText={(car_model) => {
                  setCarProfile({ ...carProfile, car_model });
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 12, color: "grey", paddingLeft: 15 }}>
                Fuel Type
              </Text>
              <Picker
                selectedValue={carProfile.fuel_type}
                style={{
                  height: 50,
                  width: 150,
                  color: Theme.COLORS.STEELBLUE,
                  fontSize: 12,
                  paddingLeft: 10,
                }}
                onValueChange={(itemValue) =>
                  setCarProfile({ ...carProfile, fuel_type: itemValue })
                }
              >
                <Picker.Item label="Choose Your Fuel" value="" />
                <Picker.Item label="Petrol" value="petrol" />
                <Picker.Item label="Diesel" value="diesel" />
                <Picker.Item label="CNO" value="CNO" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
            <View style={styles.textContainer}>
              <TextInput
                label="Year"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={styles.textInput}
                value={carProfile.year}
                onChangeText={(year) => {
                  setCarProfile({ ...carProfile, year });
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <TextInput
                label="License #"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={styles.textInput}
                value={carProfile.license_number}
                onChangeText={(license_number) => {
                  setCarProfile({ ...carProfile, license_number });
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <TextInput
                label="Insurance #"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={styles.textInput}
                value={carProfile.insurance_no}
                onChangeText={(insurance_no) => {
                  setCarProfile({ ...carProfile, insurance_no });
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <TextInput
                label="Notes"
                theme={{
                  colors: {
                    primary: Theme.COLORS.STEELBLUE,
                    underlineColor: Theme.COLORS.STEELBLUE,
                    text: Theme.COLORS.STEELBLUE,
                  },
                }}
                style={styles.textInput}
                value={carProfile.extra_notes}
                onChangeText={(extra_notes) => {
                  setCarProfile({ ...carProfile, extra_notes });
                }}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default {
  CarProfile,
  AddCar,
};

const styles = StyleSheet.create({
  cardSection: {
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  imageSection: {
    width: width * 0.88,
    justifyContent: "center",
    alignContent: "center",
  },
  imgStyle: {
    shadowColor: Theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    borderRadius: 5,
  },
  carImage: {
    width: width * 0.88,
    height: 150,
  },
  mainSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleSection: {
    flex: 2,
    flexDirection: "column",
    paddingLeft: 5,
  },
  iconSection: {
    flex: 0.2,
  },
  textContainer: {
    width: width,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textStyle: {
    color: Theme.COLORS.STEELBLUE,
    fontSize: 14,
  },
  textInput: {
    width: width * 0.75,
    paddingLeft: 2,
    backgroundColor: Theme.COLORS.WHITE,
    fontSize: 14,
    height: 60,
  },
  imageSection2: {
    width: width,
    justifyContent: "center",
    alignContent: "center",
  },
  carImage2: {
    width: width,
    height: 180,
  },
});
