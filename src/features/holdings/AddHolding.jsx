import Button from "../../ui/Button";
import CreateHoldingForm from "./CreateHoldingForm";
import Modal from "../../ui/Modal";

function AddHolding() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new holding</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateHoldingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddHolding;
