import { useInfiniteQuery } from "@tanstack/react-query";
import { BreedsApi } from "../../api/generated";

export const useGetBreeds = () => {
  const breedsApi = new BreedsApi();
  return useInfiniteQuery({
    queryKey: ["breeds"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const { data } = await breedsApi.breedsGet(
        "application/json",
        10,
        pageParam
      );
      return data;
    },
    getNextPageParam: (_lastPage, pages) => pages.length,
  });
};
