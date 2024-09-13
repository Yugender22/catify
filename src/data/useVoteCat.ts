import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VotesApi } from "../../api/generated";
import { API_KEY } from "../utils/Constants";

export const useVoteCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => {
      return new VotesApi().votesPost(API_KEY, "application/json", data);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["votes"] });
    },
  });
};
