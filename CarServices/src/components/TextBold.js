import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import * as Font from "expo-font";

let customFonts = {
  "RobotoMono-Bold": require("../../assets/fonts/RobotoMono-Bold.ttf"),
};

function TextBold(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFont = async () => {
    await Font.loadAsync(customFonts);
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFont();
  }, []);
  if (fontLoaded) {
    return (
      <Text style={{ ...styles.textStyle, ...props.style }}>
        {props.children}
      </Text>
    );
  } else {
    return <Text style={{ ...props.style }}>{props.children}</Text>;
  }
}

export default TextBold;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "RobotoMono-Bold",
  },
});
