import { Dimensions } from "react-native";

export const getImageHeight = (aspectRatio: number, padding: number = 0) => {
  const screenWidth = Dimensions.get("window").width - padding;
  const newHeight = screenWidth * aspectRatio;
  return newHeight;
};
