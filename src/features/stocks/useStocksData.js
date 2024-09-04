import { useQuery } from "@tanstack/react-query";
import { getStocksData } from "../../services/apiStocks";

export function useStocksData(arrSymbols) {
  const {
    isLoading,
    error,
    data: stocks,
  } = useQuery({
    queryFn: () => getStocksData(arrSymbols),
    queryKey: ["stocksdata", `${(arrSymbols ? arrSymbols : []).toString()}`],
  });

  return { isLoading, error, stocks };
}
