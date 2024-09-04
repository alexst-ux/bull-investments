import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import HoldingsChart from "./HoldingsChart";
import Stats from "./Stats";
import { useHoldingsAll } from "./useHoldingsAll";
import { getAveragePrices } from "../../utils/helpers";
import DurationChart from "./DurationChart";
import InvestedChart from "./InvestedChart";
import { useCurrency } from "../../context/CurrencyContext";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 20rem auto;
  gap: 2rem;
`;

function DashboardLayout() {
  const { currency } = useCurrency();

  const { isLoading, holdings } = useHoldingsAll();

  if (isLoading) return <Spinner />;

  const avrgHoldings = getAveragePrices(holdings, currency);

  return (
    <StyledDashboardLayout>
      <Stats
        holdings={holdings}
        currency={currency}
        avrgHoldings={avrgHoldings}
      />
      <InvestedChart holdings={holdings} currency={currency} />
      <DurationChart avrgHoldings={avrgHoldings} currency={currency} />
      <HoldingsChart holdings={holdings} currency={currency} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
