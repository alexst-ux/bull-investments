import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../../services/apiPortfolios";

export function usePortfolio() {
  const { portfolioId, stockId } = useParams();
  const {
    isLoading,
    data: portfolio,
    error,
  } = useQuery({
    queryKey: ["portfolio", portfolioId, stockId || -1],
    queryFn: () => getPortfolio({ portfolioId, stockId }),
    retry: false,
  });

  return { isLoading, portfolio, error };
}
