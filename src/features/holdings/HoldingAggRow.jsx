/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";

import {
  formatCurrencyExt,
  getAveragePrices,
  getCurrSymb,
  getFixedFloat,
  getInvested,
  getPercent,
} from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
//import useDeletePortfolio from "./useDeletePortfolio";
import useUnrealizedGain from "../../hooks/useUnrealizedGain";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import toast from "react-hot-toast";

const PortName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.6rem;

  color: var(--color-grey-600);
  font-family: "Sono";

  & span:first-child {
    font-weight: 600;
  }

  & span:last-child {
    color: ${(props) =>
      props.type === "grey"
        ? "var(--color-grey-500)"
        : props.type === "green"
        ? "var(--color-green-400)"
        : "var(--color-red-700)"};
    font-size: 1.3rem;
  }
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

function HoldingAggRow({ holding }) {
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const {
    stock: { symbol: name },
    avrg,
    count,
    stock_id: stockId,
  } = holding;

  //const { isDeleting, deletePortfolio } = useDeletePortfolio();

  function handleConfigHolding() {
    //navigate(`/holdings/${stockId}`);
    toast.success("sorry, the function is not implemented yet");
  }

  const invested = avrg * count;

  const { isLoading, unrealizedGain } = useUnrealizedGain(
    { [holding.stock.symbol]: { ...holding } },
    currency
  );

  if (isLoading) return <SpinnerMini />;

  const editDisabled = [1, 2, 10, 22].includes(stockId);

  return (
    <Table.Row role="row">
      <PortName type="grey">
        <span>{name}</span>
        <span>{`qty:${getFixedFloat(count, 2)}*${getCurrSymb(
          currency
        )}${getFixedFloat(avrg, 4)}`}</span>
      </PortName>
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
            <Menus.Toggle id={stockId}></Menus.Toggle>

            <Menus.List id={stockId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleConfigHolding}
              >
                Details
              </Menus.Button>
              {/* {!editDisabled && (
                <>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </>
              )} */}
            </Menus.List>

            {/* <Modal.Window name="edit">
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
            </Modal.Window> */}
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default HoldingAggRow;
