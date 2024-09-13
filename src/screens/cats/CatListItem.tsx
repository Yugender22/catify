import { View, Text, Image as ImageView, StyleSheet } from "react-native";
import React from "react";
import { Image } from "../../../api/generated";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetVote } from "../../data/useGetVotes";
import { useVoteCat } from "../../data/useVoteCat";
import { Loading } from "../../components";
import { useGetFavourite } from "../../data/useGetFavourites";
import { useAddFavouriteCat } from "../../data/useAddFavouriteCat";
import { useDeleteFavouriteCat } from "../../data/useDeleteFavouriteCat";
import { COLORS } from "../../utils/Colors";
import { getImageHeight } from "../../utils/getImageHeight";
import { Strings } from "../../utils/Strings";
import { TestIds } from "@/src/utils/TestIds";

interface Props {
  cat: Image;
}

export const CatListItem = ({ cat }: Props) => {
  const vote = useGetVote(cat.id);
  const favourite = useGetFavourite(cat.id);
  const aspectRatio = cat?.height / cat?.width;
  const newHeight = getImageHeight(aspectRatio, 32);

  const voteCat = useVoteCat();
  const favouriteCat = useAddFavouriteCat();
  const removeFavouriteCat = useDeleteFavouriteCat();

  const onUpVotePress = () => {
    voteCat.mutateAsync({
      image_id: cat.id,
      sub_id: "my-user-1234",
      value: vote.data?.value ? vote.data?.value + 1 : 1,
    });
  };
  const onDownVotePress = () => {
    voteCat.mutateAsync({
      image_id: cat.id,
      sub_id: "my-user-1234",
      value: vote.data?.value ? vote.data?.value - 1 : 0,
    });
  };
  const onFavoritePress = () => {
    favourite.data
      ? removeFavouriteCat.mutateAsync(favourite.data.id.toString())
      : favouriteCat.mutateAsync({
          image_id: cat.id,
          sub_id: "my-user-1234",
        });
  };

  const getLoadingMessage = () => {
    if (voteCat.isPending) {
      return Strings.UpdatingVote;
    } else {
      return Strings.UpdatingFavourite;
    }
  };

  return (
    <View style={styles.container}>
      {(voteCat.isPending ||
        favouriteCat.isPending ||
        removeFavouriteCat.isPending) && (
        <Loading message={getLoadingMessage()} />
      )}

      <ImageView
        testID={TestIds.CatImage}
        source={{ uri: cat.url }}
        style={[styles.image, { height: newHeight }]}
        resizeMode="contain"
      />
      <View style={styles.buttonsContainer}>
        <MaterialIcons.Button
          accessibilityRole="button"
          backgroundColor={COLORS.TRANSPARENT}
          color={favourite.data ? COLORS.RED : COLORS.BLACK}
          size={24}
          name={favourite.data ? "favorite" : "favorite-outline"}
          onPress={onFavoritePress}
        />
        <Text style={styles.vote}>{vote?.data?.value || 0}</Text>
        <MaterialIcons.Button
          accessibilityRole="button"
          backgroundColor={COLORS.WHITE}
          color={COLORS.BLUE}
          name="thumb-up"
          size={24}
          onPress={onUpVotePress}
        />
        <MaterialIcons.Button
          accessibilityRole="button"
          name="thumb-down"
          backgroundColor={COLORS.WHITE}
          color={COLORS.BLUE}
          size={24}
          onPress={onDownVotePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.WHITE,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  vote: {
    fontSize: 16,
    fontWeight: "500",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
