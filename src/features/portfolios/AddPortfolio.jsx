import Button from "../../ui/Button";
import CreatePortfolioForm from "./CreatePortfolioForm";
import Modal from "../../ui/Modal";

function AddPortfolio() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="portfolio-form">
          <Button>Add new portfolio</Button>
        </Modal.Open>
        <Modal.Window name="portfolio-form">
          <CreatePortfolioForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPortfolio;
