import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const sadCatGifUrl = require("../../assets/sad-cat.gif");

export const Error = ({ message = "Something went wrong." }) => {
  return (
    <View style={styles.container}>
      <Image source={sadCatGifUrl} style={styles.image} resizeMode="contain" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "50%",
    height: 140,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});
