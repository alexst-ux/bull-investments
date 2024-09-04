/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import Heading from "../../ui/Heading";
import { useEffect, useRef, useState } from "react";
import { useAddHolding } from "./useAddHolding";
//import { useEditHolding } from "./useEditHolding";
import Select from "../../ui/Select";
import { usePortfolios } from "../portfolios/usePortfolios";
import Spinner from "../../ui/Spinner";
import { useStocksShort } from "../stocks/useStocksShort";

function CreateHoldingForm({
  onCloseModal,
  header = "Add new holding",
  holdingToEdit = {},
}) {
  const paragraphRef = useRef(null); // to scroll to the form

  const { id: editId, ...editValues } = holdingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  //reset(); // the reset is from useForm() hook
  const { isAdding, addHolding } = useAddHolding();
  //const { isEditing, editHolding } = useEditHolding();
  const { isLoading: isLoadingPortf, error, portfolios } = usePortfolios();
  const [portfolioId, setPortfolioId] = useState();

  const { isLoading: isLoadingStocks, stocks } = useStocksShort();
  const [stockId, setStockId] = useState();

  useEffect(function () {
    paragraphRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  function onSubmit(data) {
    if (isEditSession) {
      null;
      /* editHolding(
        { newHoldingData: { ...data }, id: editId },
        {
          onSuccess: (data) => {
            //console.log(data); // the data that returned from function createEditCabin
            reset();
            onCloseModal?.();
          },
        }
      ); */
    } else {
      addHolding(data, {
        onSuccess: (data) => {
          //console.log(data); // the data that returned from function createEditCabin
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  function onError(errors) {
    //console.log(errors);
    // add some if you need
  }
  const isWorking =
    isAdding /* || isEditing */ || isLoadingPortf || isLoadingStocks;

  if (isLoadingPortf || isLoadingStocks) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading as="h3" ref={paragraphRef}>
        {header}
      </Heading>
      <FormRow label="Portfolio" error={errors?.portfolio_id?.message}>
        <Select
          options={portfolios.map((obj) => ({
            value: obj.id,
            label: obj.name,
          }))}
          value={portfolioId}
          onChange={(e) => setPortfolioId(e.target.value)}
          id="portfolio_id"
          disabled={isWorking}
          {...register("portfolio_id", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Symbol" error={errors?.stock_id?.message}>
        <Select
          options={stocks.map((obj) => ({
            value: `{ "id": ${obj.id}, "currency": "${obj.currency}", "symbol": "${obj.symbol}" }`,
            label: obj.symbol,
          }))}
          value={stockId}
          onChange={(e) => setStockId(e.target.value)}
          id="stock_id"
          disabled={isWorking}
          {...register("stock_id", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.start_price_currencies?.message}>
        <Input
          type="number"
          step="0.01"
          id="start_price_currencies"
          disabled={isWorking}
          {...register("start_price_currencies", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Quantity" error={errors?.quantity?.message}>
        <Input
          type="number"
          id="quantity"
          disabled={isWorking}
          {...register("quantity", {
            required: "This field is required",
            min: { value: 1, message: "Quantity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Date" error={errors?.start_date?.message}>
        <Input
          type="date"
          id="start_date"
          disabled={isWorking}
          {...register("start_date", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Commission" error={errors?.commission?.message}>
        <Input
          type="number"
          step="0.01"
          id="commission"
          disabled={isWorking}
          {...register("commission")}
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
          {isEditSession ? "Edit holding" : "Add holding"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateHoldingForm;
