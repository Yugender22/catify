import { useInfiniteQuery } from "@tanstack/react-query";
import { ImagesApi } from "../../api/generated";
import { API_KEY } from "../utils/Constants";

export const useGetCats = () => {
  const imagesApi = new ImagesApi();
  return useInfiniteQuery({
    queryKey: ["cats"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const { data } = await imagesApi.imagesGet(
        API_KEY,
        "application/json",
        10,
        pageParam,
        "DESC"
      );
      return data;
    },
    getNextPageParam: (_lastPage, pages) => pages.length,
  });
};
