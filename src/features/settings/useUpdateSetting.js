import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { QUERY_KEY_SETTINGS } from "../../services/constants";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_SETTINGS] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateSetting };
}
