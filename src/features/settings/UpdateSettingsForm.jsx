import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  function handleUpdate(e) {
    const { id, value } = e.target;
    if (!value) return;
    updateSetting({ [id]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e)}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
