import { useQuery } from "@tanstack/react-query";
import { getStocksShort } from "../../services/apiStocks";

export function useStocksShort() {
  const {
    isLoading,
    error,
    data: stocks,
  } = useQuery({
    queryKey: ["stocksshort"],
    queryFn: getStocksShort,
  });

  return { isLoading, error, stocks };
}
