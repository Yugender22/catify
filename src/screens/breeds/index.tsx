import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Error, Loading } from "../../components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useGetBreeds } from "../../data/useGetBreeds";
import { BreedListItem } from "./BreedListItem";
import { COLORS } from "../../utils/Colors";
import { RootStackParamList } from "../../navigation";
import { TestIds } from "@/src/utils/TestIds";

type BreedsProps = NativeStackScreenProps<RootStackParamList, "Breeds">;

export function Breeds(props: BreedsProps) {
  const breeds = useGetBreeds();
  const params = props?.route?.params;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  if (breeds?.isLoading) {
    return <Loading />;
  }

  if (breeds?.isError) {
    return <Error />;
  }

  return (
    <FlatList
      testID={TestIds.BreedsList}
      data={breeds?.data?.pages?.flat()}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
        <BreedListItem
          breed={item}
          onPress={() => {
            navigation.goBack();
            params.onBreedSelect && params.onBreedSelect(item);
          }}
        />
      )}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      onEndReached={() => {
        breeds.fetchNextPage();
      }}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 0.5,
    backgroundColor: `${COLORS.BLUE}66`,
  },
});
