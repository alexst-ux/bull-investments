/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getFixedFloat } from "../../utils/helpers";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 0.4rem 0.4rem 0.4rem 1.2rem;
  /* grid-column: 3 / span 2;*/
  grid-column: 4;

  & > *:first-child {
    margin-bottom: 0.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 100;
  }

  & .recharts-legend-item-text {
    font-size: smaller;
  }
  & .recharts-default-legend {
    margin-left: 15px;
  }
`;

const colorsLight = [
  "#ef4444",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#f97316",
  "#14b8a6",
  "#3b82f6",
  "#a855f7",
];

const colorsDark = [
  "#d32525",
  "#a16207",
  "#4d7c0f",
  "#15803d",
  "#c2410c",
  "#0f766e",
  "#1d4ed8",
  "#7e22ce",
];

function DurationChart({ avrgHoldings }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode ? colorsDark : colorsLight;

  const data = [];
  let ic = 0;
  for (const [key, value] of Object.entries(avrgHoldings)) {
    if (ic === colors.length) ic = 0;
    const amount = getFixedFloat(value.avrg * value.count, 2);
    data.push({
      /*symbol: `${key}: ${formatCurrencyExt(amount, currency)}`,*/
      symbol: `${key}`,
      amount,
      color: colors[ic++],
    });
  }

  return (
    <ChartBox>
      <Heading as="h3">Invested Pie</Heading>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data}
            nameKey="symbol"
            dataKey="amount"
            innerRadius={50}
            outerRadius={65}
            cx="47%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.symbol}
              />
            ))}
          </Pie>
          <Tooltip />

          <Legend
            verticalAlign="top"
            align="right"
            /* width="45%" */
            layout="vertical"
            iconType="circle"
            iconSize={6}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
