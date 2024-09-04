/* eslint-disable react/prop-types */
import styled from "styled-components";

import Heading from "../../ui/Heading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getInvestedMonths } from "../../utils/helpers";
import { useDarkMode } from "../../context/DarkModeContext";
import { chartDarkMode, chartLightMode } from "../../styles/GlobalStyles";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  grid-column: 1 / span 3;
  padding: 0.4rem 1.2rem;
  & .recharts-cartesian-axis-ticks {
    font-size: 1.2rem;
  }
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function InvestedChart({ holdings, currency }) {
  const { isDarkMode } = useDarkMode();
  const pageData = getInvestedMonths(holdings, currency || "USD");

  const colors = isDarkMode ? chartDarkMode : chartLightMode;

  return (
    <StyledToday>
      <Heading as="h3">Invested by month</Heading>
      {holdings ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width="100%"
            height="100%"
            data={pageData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="sum" stackId="a" fill="#689aec" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <span>No holdings yet</span>
      )}
    </StyledToday>
  );
}

export default InvestedChart;
