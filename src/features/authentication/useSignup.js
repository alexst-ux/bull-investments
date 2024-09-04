import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiSignup";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        `Account ${user.user.user_metadata.fullName} successfully created. Please verify the new account from the user's email address.`
      );
    },
  });

  return { signup, isLoading };
}
