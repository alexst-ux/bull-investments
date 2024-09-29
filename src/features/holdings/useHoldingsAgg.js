import { useQuery } from "@tanstack/react-query";
import { getActiveHoldings } from "../../services/apiHoldings";
import { getAveragePrices } from "../../utils/helpers";
import { useCurrency } from "../../context/CurrencyContext";

export function useHoldingsAgg() {
  const { currency } = useCurrency();
  const sortBy = { field: "stock_id", direction: "desc" };
  const { isLoading, data: holdings } = useQuery({
    queryFn: () => getActiveHoldings({ sortBy }),
    queryKey: ["actholdingsagg", sortBy.field, sortBy.direction],
  });

  let holdingsAgg;
  if (!isLoading) {
    const avgPrices = getAveragePrices(holdings, currency);
    holdingsAgg = Object.keys(avgPrices)
      .map((el) => ({
        ...avgPrices[el],
        stock: { symbol: el },
      }))
      .sort((a, b) => b.avrg * b.count - a.avrg * a.count);
  }

  return { isLoading, holdingsAgg };
}
