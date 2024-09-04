/* eslint-disable react/prop-types */
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStocksData } from "../stocks/useStocksData";
import SpinnerMini from "../../ui/SpinnerMini";
import { getHoldingsMonthChart } from "../../utils/charts";
import { getCurrSymb, getStockSymbols } from "../../utils/helpers";
import toast from "react-hot-toast";
import { useDarkMode } from "../../context/DarkModeContext";
import { chartDarkMode, chartLightMode } from "../../styles/GlobalStyles";

const StyledHoldingsChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function HoldingsChart({ holdings, currency }) {
  const { isDarkMode } = useDarkMode();

  const {
    isLoading,
    error,
    stocks: stockData,
  } = useStocksData(getStockSymbols(holdings)); // to know currency data each month

  if (isLoading) return <SpinnerMini />;

  if (error) {
    toast.error(error);
    return null;
  }

  /* the data has { label: "yyyy-MMM", totalUSD: amountUSD, totalCURRENCY: amountCurrency } */
  const data =
    holdings && holdings.length > 0
      ? getHoldingsMonthChart(holdings, stockData, currency)
      : null;

  const colors = isDarkMode ? chartDarkMode : chartLightMode;

  return (
    <StyledHoldingsChart>
      <Heading as="h3">Unrealized profit for all time</Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="totalUSD"
            type="monotone"
            stroke={colors.profitUSD.stroke}
            strokeWidth={2}
            fill={colors.profitUSD.fill}
            name="profit"
            unit="$"
          />

          {currency != "USD" && (
            <Area
              dataKey="totalCURRENCY"
              type="monotone"
              stroke={colors.profitCurr.stroke}
              strokeWidth={2}
              fill={colors.profitCurr.fill}
              name="profit"
              unit={getCurrSymb(currency)}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </StyledHoldingsChart>
  );
}

export default HoldingsChart;
