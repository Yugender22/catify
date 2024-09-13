import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Animated,
} from "react-native";
import React from "react";
import { useGetCats } from "../../data/useGetCats";
import { Error, Loading } from "../../components";
import { CatListItem } from "./CatListItem";
import { useGetVotes } from "../../data/useGetVotes";
import { useGetFavourites } from "../../data/useGetFavourites";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../../utils/Colors";
import { TestIds } from "@/src/utils/TestIds";

export function Cats() {
  const cats = useGetCats();
  const votes = useGetVotes();
  const favourites = useGetFavourites();

  if (cats?.isLoading || votes?.isLoading || favourites?.isLoading) {
    return <Loading />;
  }

  if (cats?.isError) {
    return <Error />;
  }

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
    <FlatList
      testID={TestIds.CatsList}
      data={cats?.data?.pages?.flat()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CatListItem cat={item} />}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      onEndReached={() => {
        cats.fetchNextPage();
      }}
      ListFooterComponent={() =>
        cats.isFetchingNextPage ? (
          <View style={styles.loading}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <FontAwesome6 name="paw" size={50} color={COLORS.BLUE} />
            </Animated.View>
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl
          colors={[COLORS.BLUE]}
          refreshing={
            cats.isRefetching || votes.isRefetching || favourites.isRefetching
          }
          onRefresh={() => {
            cats.refetch();
            votes.refetch();
            favourites.refetch();
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000066",
    paddingVertical: 20,
  },
  divider: {
    height: 0.5,
    backgroundColor: `${COLORS.BLUE}66`,
  },
});
