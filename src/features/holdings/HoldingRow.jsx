/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import {
  formatCurrencyExt,
  getInvested,
  getPercent,
} from "../../utils/helpers";
import useUnrealizedGain from "../../hooks/useUnrealizedGain";
import SpinnerMini from "../../ui/SpinnerMini";

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
  }

  & span:last-child {
    /* color: var(--color-grey-500); */
    color: ${(props) =>
      props.type === "grey"
        ? "var(--color-grey-500)"
        : props.type === "green"
        ? "var(--color-green-400)"
        : "var(--color-red-700)"};
    font-size: 1.3rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function HoldingRow({ symbol, avrgHolding, holdings, currency }) {
  const { isLoading, unrealizedGain, currentPrices } = useUnrealizedGain(
    avrgHolding,
    currency
  );

  if (isLoading) return <SpinnerMini />;

  const invested = getInvested(holdings, currency);

  return (
    <Table.Row>
      <Stacked type="grey">
        <span>{symbol}</span>
        <span>{`buy ${avrgHolding[symbol].count} * ${formatCurrencyExt(
          avrgHolding[symbol].avrg,
          currency
        )}`}</span>
      </Stacked>

      <Stacked type={unrealizedGain >= 0 ? "green" : "red"}>
        <span>
          {formatCurrencyExt(currentPrices[0].currency[currency], currency)}
        </span>
        <span>
          {formatCurrencyExt(unrealizedGain, currency)} (
          {`${getPercent(invested, unrealizedGain)}%`})
        </span>
      </Stacked>
    </Table.Row>
  );
}

export default HoldingRow;
