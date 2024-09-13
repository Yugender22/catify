import { useQuery } from "@tanstack/react-query";
import { Favourite, FavouritesApi } from "../../api/generated";
import { API_KEY } from "../utils/Constants";

export const useGetFavourites = () => {
  const favouritesApi = new FavouritesApi();
  return useQuery({
    queryKey: ["favourites"],
    queryFn: async () => {
      const { data } = await favouritesApi.favouritesGet(API_KEY);
      return data;
    },
  });
};

export const useGetFavourite = (image_id?: string) => {
  const favouritesApi = new FavouritesApi();
  return useQuery({
    queryKey: ["favourites"],
    queryFn: async () => {
      const { data } = await favouritesApi.favouritesGet(API_KEY);
      return data;
    },
    select: (data: Favourite[]) =>
      data.find((item) => item.image_id === image_id),
  });
};
