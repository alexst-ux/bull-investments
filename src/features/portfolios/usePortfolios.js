import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_PORTFOLIO } from "../../services/constants";
import { getPortfolios } from "../../services/apiPortfolios";

export function usePortfolios() {
  const {
    isLoading,
    error,
    data: portfolios,
  } = useQuery({
    queryKey: [QUERY_KEY_PORTFOLIO],
    queryFn: () => getPortfolios(),
  });

  return { isLoading, error, portfolios };
}
