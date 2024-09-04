import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditHolding } from "../../services/apiHoldings";

export function useAddHolding() {
  const queryClient = useQueryClient(); // it is from App.jsx
  const { mutate: addHolding, isLoading: isAdding } = useMutation({
    mutationFn: createEditHolding,
    onSuccess: () => {
      toast.success("The holding has been added");

      queryClient.invalidateQueries({
        queryKey: ["holdings"],
      });
      //handleShowForm();
    },
    onError: (error) => toast.error(error.message),
  });

  return { isAdding, addHolding };
}
