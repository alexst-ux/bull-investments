/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import Heading from "../../ui/Heading";
import { useEffect, useRef } from "react";
import useCreatePortfolio from "./useCreatePortfolio";
import useEditPortfolio from "./useEditPortfolio";

function CreatePortfolioForm({
  onCloseModal,
  header = "Add new portfolio",
  portfolioToEdit = {},
}) {
  const paragraphRef = useRef(null); // to scroll to the form

  const { id: editId, name, description } = portfolioToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? { name, description } : {},
  });
  const { errors } = formState;

  //reset(); // the reset is from useForm() hook
  const { isCreating, createPortfolio } = useCreatePortfolio();
  const { isEditing, editPortfolio } = useEditPortfolio();

  useEffect(function () {
    paragraphRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  function onSubmit(data) {
    if (isEditSession) {
      editPortfolio(
        { newPortfolioData: { ...data }, id: editId },
        {
          // eslint-disable-next-line no-unused-vars
          onSuccess: (data) => {
            //console.log(data); // the data that returned from function createEditPortfolio
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createPortfolio(
        { ...data },
        {
          // eslint-disable-next-line no-unused-vars
          onSuccess: (data) => {
            //console.log(data); // the data that returned from function createEditPortfolio
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // eslint-disable-next-line no-unused-vars
  function onError(errors) {
    //console.log(errors);
    // add some if you need
  }
  const isWorking = isCreating || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading as="h3" ref={paragraphRef}>
        {header}
      </Heading>
      <FormRow label="Portfolio name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit portfolio" : "Add portfolio"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreatePortfolioForm;
