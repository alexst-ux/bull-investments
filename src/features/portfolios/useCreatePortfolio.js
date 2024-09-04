import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPortfolio } from "../../services/apiPortfolios";
import toast from "react-hot-toast";
import useUser from "../authentication/useUser";
import {
  QUERY_KEY_PORTFOLIO,
  QUERY_KEY_PORTFOLIO_EXT,
} from "../../services/constants";

export default function useCreatePortfolio() {
  const { user } = useUser();
  const queryClient = useQueryClient(); // it is from App.jsx
  const { mutate: createPortfolio, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createEditPortfolio(data, user.id),
    onSuccess: () => {
      toast.success("The portfolio has been created");

      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_PORTFOLIO],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_PORTFOLIO_EXT],
        }),
      ]);
      //handleShowForm();
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createPortfolio };
}
