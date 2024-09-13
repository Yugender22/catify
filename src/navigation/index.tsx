import {
  NavigationContainer,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { AddCat, Breeds, Cats } from "../screens";
import { Breed } from "../../api/generated";
import { COLORS } from "../utils/Colors";
import { StatusBar, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type RootStackParamList = {
  Cats: undefined;
  AddCat: undefined;
  Breeds: {
    onBreedSelect?: (breedId: Breed) => void;
  };
};

const AddNewCat = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity
      testID="AddCat-Button-TestID"
      style={{ padding: 4 }}
      onPress={() => navigation?.navigate("AddCat")}
    >
      <MaterialCommunityIcons
        color={COLORS.WHITE}
        name="plus-thick"
        size={28}
      />
    </TouchableOpacity>
  );
};

export default function Navigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} backgroundColor={COLORS.BLUE} />
      <Stack.Navigator
        initialRouteName="Cats"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.BLUE,
          },
          headerTintColor: COLORS.WHITE,
        }}
      >
        <Stack.Screen
          name="Cats"
          component={Cats}
          options={{
            headerRight: () => <AddNewCat />,
          }}
        />
        <Stack.Screen
          name="AddCat"
          component={AddCat}
          options={{ headerTitle: "Add a Cat" }}
        />
        <Stack.Screen name="Breeds" component={Breeds} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
