import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FavouritesApi } from "../../api/generated";
import { API_KEY } from "../utils/Constants";

export const useDeleteFavouriteCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return new FavouritesApi().favouritesFavouriteIdDelete(API_KEY, id);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
};
