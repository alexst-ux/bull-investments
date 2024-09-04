import { useQuery } from "@tanstack/react-query";
import { getActiveHoldings } from "../../services/apiHoldings";

export function useHoldingsAll() {
  const { isLoading, data: holdings } = useQuery({
    queryFn: () => getActiveHoldings(),
    queryKey: ["actholdings"],
  });

  return { isLoading, holdings };
}
