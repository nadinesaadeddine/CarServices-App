import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, PanResponder, Text } from "react-native";

export function HomeCards(props) {
  const pan = new Animated.ValueXY();
  const pan2 = new Animated.ValueXY();
  const _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
      }).start();
      Animated.spring(pan2, {
        toValue: { x: 0, y: 0 },
      }).start();
    },
  });

  return (
    <>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {..._panResponder.panHandlers}
      >
        <View
          style={{
            backgroundColor: "red",
            height: 100,
            width: 100,
            position: "absolute",
          }}
        >
          <Text>Hellooo</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {..._panResponder.panHandlers}
      >
        <View
          style={{
            backgroundColor: "blue",
            height: 100,
            width: 100,
            position: "absolute",
          }}
        >
          <Text>Hellooo</Text>
        </View>
      </Animated.View>
    </>
  );
}
