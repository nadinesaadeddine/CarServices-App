import React from "react";
import { ImageBackground, Dimensions } from "react-native";
import { Header, Icon } from "react-native-elements";
import Images from "../../constants/Images";

const { height, width } = Dimensions.get("screen");

function leftComponent() {
  return <Icon name="menu" color="#fff" />;
}
export function ScreenHeader(props) {
  let navigation = props.navigation;
  let isBack = props.isBack;

  let icon;
  if (props.showAddIcon) icon = "add-circle";
  else if (props.showSaveIcon) icon = "save";
  else if (props.showEditIcon) icon = "edit";
  else icon = "";

  const handleIconPress = () => {
    if (props.handleAdd) {
      props.handleAdd();
    } else if (props.handleSave) {
      props.handleSave();
    } else if (props.handleEdit) {
      props.handleEdit();
    }
  };
  const handleMenu = (navigation) => {
    alert(navigation);
    //navigation.toggleDrawer();
  };
  let leftIcon = isBack ? "arrow-back" : "menu";
  return (
    <ImageBackground
      source={Images.RegisterBackground}
      style={{ width: width }}
    >
      <Header
        placement="left"
        leftComponent={{
          icon: leftIcon,
          color: "#fff",
          underlayColor: "#64b5f6",
        }}
        centerComponent={{
          text: props.title,
          style: { color: "#fff", fontSize: 18 },
        }}
        rightComponent={{
          icon: icon,
          color: "#fff",
          onPress: handleIconPress,
          underlayColor: "#64b5f6",
        }}
        containerStyle={{
          backgroundColor: "transparent", //3b3e67
          justifyContent: "space-around",
          height: 70,
        }}
        statusBarProps={{ barStyle: "light-content" }}
      />
    </ImageBackground>
  );
}
