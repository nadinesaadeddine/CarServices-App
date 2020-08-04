import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import ajax from "../services/RequestServices";
import { useFocusEffect } from "@react-navigation/native";

export default function Badge({ name, color, size, user_id }) {
  const [count, setCount] = useState(0);
  const getUserUndoneServices = async () => {
    if (user_id) {
      let data = await ajax.getServicesByUser(user_id);
      if (data) {
        setCount(data.length);
      } else setCount(0);
    }
  };

  useEffect(() => {
    getUserUndoneServices();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserUndoneServices();
    }, [])
  );
  return (
    <View style={{ width: 24, height: 24 }}>
      <FontAwesome5 name={name} size={size} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={{ fontSize: 10, color: "white", fontWeight: "600" }}>
            {count}
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "#FF6583",
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
