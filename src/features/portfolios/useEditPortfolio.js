import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPortfolio } from "../../services/apiPortfolios";
import {
  QUERY_KEY_PORTFOLIO,
  QUERY_KEY_PORTFOLIO_EXT,
} from "../../services/constants";
import toast from "react-hot-toast";

export default function useEditPortfolio() {
  const queryClient = useQueryClient(); // it is from App.jsx
  const { mutate: editPortfolio, isLoading: isEditing } = useMutation({
    mutationFn: ({ newPortfolioData, id }) =>
      createEditPortfolio(newPortfolioData, null, id),
    onSuccess: () => {
      toast.success("The portfolio has been updated");

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

  return { isEditing, editPortfolio };
}
