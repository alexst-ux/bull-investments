import { useQuery } from "@tanstack/react-query";
import { getCurrentPrices } from "../services/apiHoldings";
import { getUnrealizedGain } from "../utils/helpers";

export default function useUnrealizedGain(avrgHoldings, currency) {
  const { isLoading, data: currentPrices } = useQuery({
    queryFn: () => getCurrentPrices(avrgHoldings),
    queryKey: [
      "getCurrentPrices",
      `${(avrgHoldings ? Object.keys(avrgHoldings) : []).toString()}`,
    ],
  });

  if (isLoading) return { isLoading, unrealizedGain: undefined };

  const unrealizedGain = getUnrealizedGain(
    avrgHoldings,
    currentPrices,
    currency
  );

  return { isLoading, unrealizedGain, currentPrices };
}
