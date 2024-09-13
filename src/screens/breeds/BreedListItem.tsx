import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Breed } from "../../../api/generated";
import { COLORS } from "../../utils/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  breed: Breed;
  onPress: () => void;
}

export const BreedListItem = ({ breed, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{breed.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: COLORS.WHITE,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
});
