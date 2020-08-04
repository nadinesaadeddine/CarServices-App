import React, { Component } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const { height, width } = Dimensions.get("screen");

function CustomModal(props) {
  const modalHeight = props.bottomHalf ? height / 2 : height;
  const styles = StyleSheetFactory.getSheet({
    boxBgColor: props.boxBackgroundColor,
    fullscreen: props.fullscreen,
    modalHeight: modalHeight,
    bottomHalf: props.bottomHalf,
  });
  return (
    <Modal
      animationType={props.animation}
      transparent={props.transparentContainer}
      visible={props.visible}
      presentationStyle={props.mode}
    >
      <TouchableWithoutFeedback onPress={() => props.outsideClick()}>
        <View style={styles.mainContainer}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>{props.children}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default CustomModal;
