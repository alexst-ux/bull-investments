import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import { useNavigate } from "react-router-dom";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const navigate = useNavigate();
  const { isLoading, signup } = useSignup();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onCustomSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset /* all situations */,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onCustomSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => navigate("/login")}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Signup</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
