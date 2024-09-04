import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../services/apiPortfolios";

export function usePortfolio() {
  const { portfolioId } = useParams();
  const {
    isLoading,
    data: portfolio,
    error,
  } = useQuery({
    queryKey: ["portfolio", portfolioId],
    queryFn: () => getPortfolio(portfolioId),
    retry: false,
  });

  return { isLoading, portfolio, error };
}
