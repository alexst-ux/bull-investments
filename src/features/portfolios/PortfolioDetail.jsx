import styled from "styled-components";
import Stats from "../dashboard/Stats";
import { useCurrency } from "../../context/CurrencyContext";
import Spinner from "../../ui/Spinner";
import { getAveragePrices } from "../../utils/helpers";
import { usePortfolio } from "./usePortfolio";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import HoldingTable from "../holdings/HoldingTable";
import { useNavigate } from "react-router-dom";

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

function PortfolioDetail() {
  const { isLoading, portfolio } = usePortfolio();
  const { currency } = useCurrency();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { holdings } = portfolio;
  const avrgHoldings = getAveragePrices(holdings, currency);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{portfolio.name}</Heading>
      </Row>
      <StyledLayout>
        <Stats
          holdings={holdings}
          currency={currency}
          avrgHoldings={avrgHoldings}
        />
      </StyledLayout>
      <HoldingTable holdings={holdings} avrgHoldings={avrgHoldings} />
      <ButtonGroup justify="flex-start">
        <Button variation="secondary" onClick={() => navigate("/portfolios")}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default PortfolioDetail;
