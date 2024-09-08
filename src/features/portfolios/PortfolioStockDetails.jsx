import { usePortfolio } from "./usePortfolio";
import { useCurrency } from "../../context/CurrencyContext";

import Spinner from "../../ui/Spinner";
import { getAveragePrices } from "../../utils/helpers";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Stats from "../dashboard/Stats";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import HoldingStockTable from "../holdings/HoldingStockTable";

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

function PortfolioStockDetails() {
  const { portfolioId } = useParams();
  const { isLoading, portfolio } = usePortfolio();
  const { currency } = useCurrency();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { holdings } = portfolio;
  const avrgHoldings = getAveragePrices(holdings, currency);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{`${portfolio.name}: ${Object.keys(avrgHoldings).at(
          0
        )}`}</Heading>
      </Row>
      <StyledLayout>
        <Stats
          holdings={holdings}
          currency={currency}
          avrgHoldings={avrgHoldings}
        />
      </StyledLayout>
      <HoldingStockTable holdings={holdings} />
      <ButtonGroup justify="flex-start">
        <Button
          variation="secondary"
          onClick={() => navigate(`/portfolios/${portfolioId}`)}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default PortfolioStockDetails;
