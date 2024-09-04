/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";

import {
  formatCurrencyExt,
  getAveragePrices,
  getInvested,
  getPercent,
} from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreatePortfolioForm from "./CreatePortfolioForm";
import useDeletePortfolio from "./useDeletePortfolio";
import useUnrealizedGain from "../../hooks/useUnrealizedGain";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

const PortName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const ProfitLoss = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: ${(props) =>
    props.profit ? "var(--color-green-400)" : "var(--color-red-700)"};
`;

function PortfolioRow({ portfolio, currency }) {
  const navigate = useNavigate();
  const { id: portfolioId, name, holdings } = portfolio;

  const { isDeleting, deletePortfolio } = useDeletePortfolio();

  function handleConfigPortfolio() {
    navigate(`/portfolios/${portfolioId}`);
    /* createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    }); */
  }

  const avrgHoldings = getAveragePrices(holdings, currency);

  const invested = getInvested(holdings, currency);

  const { isLoading, unrealizedGain } = useUnrealizedGain(
    avrgHoldings,
    currency
  );

  if (isLoading) return <SpinnerMini />;

  const editDisabled = [1, 2, 10].includes(portfolioId);

  return (
    <Table.Row role="row">
      <PortName>{name}</PortName>
      <Price>{formatCurrencyExt(invested, currency)}</Price>
      <ProfitLoss profit={unrealizedGain >= 0}>
        {formatCurrencyExt(unrealizedGain, currency)}
      </ProfitLoss>
      <ProfitLoss profit={unrealizedGain >= 0}>{`${getPercent(
        invested,
        unrealizedGain
      )}%`}</ProfitLoss>
      <Price>{formatCurrencyExt(invested + unrealizedGain, currency)}</Price>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={portfolioId}></Menus.Toggle>

            <Menus.List id={portfolioId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleConfigPortfolio}
              >
                Details
              </Menus.Button>
              {!editDisabled && (
                <>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </>
              )}
            </Menus.List>

            <Modal.Window name="edit">
              <CreatePortfolioForm
                header="Edit portfolio"
                portfolioToEdit={portfolio}
              />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="portfolio"
                onConfirm={() => deletePortfolio(portfolioId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default PortfolioRow;
