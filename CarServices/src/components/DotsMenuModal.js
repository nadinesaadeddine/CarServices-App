import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function DotsMenuModal(props) {
  const handleView = (id) => {
    props.getView(id);
  };

  const handleEdit = (id) => {
    props.getEdit(id);
  };

  const handleDelete = (id) => {
    props.getDelete(id);
  };

  return (
    <View style={styles.menuContainer}>
      {props.showView && (
        <TouchableOpacity onPress={() => handleView(props.id)}>
          <View>
            <MaterialIcons name="pageview" size={20} color="#D3D3D3" />
          </View>
        </TouchableOpacity>
      )}
      {props.showEdit && (
        <TouchableOpacity onPress={() => handleEdit(props.id)}>
          <View>
            <MaterialIcons name="edit" size={20} color="#D3D3D3" />
          </View>
        </TouchableOpacity>
      )}
      {props.showDelete && (
        <TouchableOpacity onPress={() => handleDelete(props.id)}>
          <View>
            <MaterialIcons name="delete" size={20} color="#D3D3D3" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
