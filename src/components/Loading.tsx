import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../utils/Colors";

export const Loading = ({ message = "Loading...", color = COLORS.BLUE }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome6 name="paw" size={50} color={color} />
      </Animated.View>
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.BLACK_TRANSPARENT,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
