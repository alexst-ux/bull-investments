import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_PORTFOLIO_EXT } from "../../services/constants";
import { getPortfoliosExt } from "../../services/apiPortfolios";

export function usePortfoliosExt() {
  const {
    isLoading,
    error,
    data: portfolios,
  } = useQuery({
    queryKey: [QUERY_KEY_PORTFOLIO_EXT],
    queryFn: () => getPortfoliosExt(),
  });

  return { isLoading, error, portfolios };
}
