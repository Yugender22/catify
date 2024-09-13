import { useQuery } from "@tanstack/react-query";
import { Vote, VotesApi } from "../../api/generated";
import { API_KEY } from "../utils/Constants";

export const useGetVotes = () => {
  const votesApi = new VotesApi();
  return useQuery({
    queryKey: ["votes"],
    queryFn: async () => {
      const { data } = await votesApi.votesGet(API_KEY);
      return data;
    },
  });
};

export const useGetVote = (image_id?: string) => {
  const votesApi = new VotesApi();
  return useQuery({
    queryKey: ["votes"],
    queryFn: async () => {
      const { data } = await votesApi.votesGet(API_KEY);
      return data;
    },
    select: (data: Vote[]) => data.find((item) => item.image_id === image_id),
  });
};
