import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { QUERY_KEY_SETTINGS } from "../../services/constants";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: [QUERY_KEY_SETTINGS],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}
