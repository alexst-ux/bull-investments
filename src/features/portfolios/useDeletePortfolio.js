import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolio as deletePortfolioAPI } from "../../services/apiPortfolios";
import {
  QUERY_KEY_PORTFOLIO,
  QUERY_KEY_PORTFOLIO_EXT,
} from "../../services/constants";
import toast from "react-hot-toast";

export default function useDeletePortfolio() {
  const queryClient = useQueryClient(); // it is a QueryClient from the App.jsx

  const { isLoading: isDeleting, mutate: deletePortfolio } = useMutation({
    mutationFn: (id) => deletePortfolioAPI(id),
    onSuccess: () => {
      toast.success("The portfolio has been deleted");

      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_PORTFOLIO],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_PORTFOLIO_EXT],
        }),
      ]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deletePortfolio };
}
