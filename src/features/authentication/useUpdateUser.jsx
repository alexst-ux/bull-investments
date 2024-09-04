import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient(); // it is from App.jsx
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("The user has been updated");

      /* can be used to set new user data:
        queryClient.setQueryData(["user"], user );
      */

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      //handleShowForm();
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateUser };
}
