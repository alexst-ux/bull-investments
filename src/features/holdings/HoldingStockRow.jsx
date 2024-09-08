/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import {
  formatCurrencyExt,
  getAveragePrices,
  getInvested,
  getPercent,
} from "../../utils/helpers";
import useUnrealizedGain from "../../hooks/useUnrealizedGain";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCurrency } from "../../context/CurrencyContext";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiSquare2Stack } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const Symbol = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
    color: ${(props) =>
      props.type === "grey"
        ? "var(--color-grey-500)"
        : props.type === "green"
        ? "var(--color-green-400)"
        : "var(--color-red-700)"};
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.3rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function HoldingStockRow({ stockId, holding }) {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  const { currency } = useCurrency();
  const holdings = new Array(holding);
  const avrgHolding = getAveragePrices(holdings, currency);
  const { isLoading, unrealizedGain, currentPrices } = useUnrealizedGain(
    avrgHolding,
    currency
  );

  function handleDetails() {
    //navigate(`/portfolios/${portfolioId}/${stockId}`);
    alert("Sorry, is not implemented yet");
  }

  if (isLoading) return <SpinnerMini />;

  const symbol = holding.stock.symbol;
  const invested = getInvested(holdings, currency);

  return (
    <Table.Row>
      <Stacked type="grey">
        <span>{`buy ${holding.quantity} * ${formatCurrencyExt(
          avrgHolding[symbol].avrg,
          currency
        )}`}</span>
        <span>{format(new Date(holding.start_date), "dd-MMM-yyyy")}</span>
      </Stacked>

      <Stacked type={unrealizedGain >= 0 ? "green" : "red"}>
        <span>
          {formatCurrencyExt(unrealizedGain, currency)} (
          {`${getPercent(invested, unrealizedGain)}%`})
        </span>
        <span>
          {formatCurrencyExt(currentPrices[0].currency[currency], currency)}
        </span>
      </Stacked>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={stockId}></Menus.Toggle>

            <Menus.List id={stockId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDetails}>
                Details
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default HoldingStockRow;
