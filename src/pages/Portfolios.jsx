import AddPortfolio from "../features/portfolios/AddPortfolio";
import PortfolioTable from "../features/portfolios/PortfolioTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Portfolios() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All portfolios</Heading>
      </Row>
      <Row>
        <PortfolioTable />
        <AddPortfolio />
      </Row>
    </>
  );
}

export default Portfolios;
