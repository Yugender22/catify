import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FavouritesApi } from "../../api/generated";
import { API_KEY } from "../utils/Constants";

export const useAddFavouriteCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => {
      return new FavouritesApi().favouritesPost(
        API_KEY,
        "application/json",
        data
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
};
