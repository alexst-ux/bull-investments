import { useCurrency } from "../../context/CurrencyContext";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PortfolioRow from "./PortfolioRow";
import { usePortfoliosExt } from "./usePortfoliosExt";

function PortfolioTable() {
  // eslint-disable-next-line no-unused-vars
  const { currency } = useCurrency();
  const { isLoading, portfolios } = usePortfoliosExt();

  if (isLoading) return <Spinner />;

  if (!portfolios.length) return <Empty resourceName="portfolios" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 2fr 0.5fr">
        <Table.Header role="table">
          <div>Name</div>
          <div>Invested</div>
          <div>Unrealized Gain</div>
          <div>Unrealized %</div>
          <div>Market Value</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={portfolios}
          render={(portfolio) => (
            <PortfolioRow
              key={portfolio.id}
              portfolio={portfolio}
              currency={currency}
            />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={10} />
      </Table.Footer>
    </Menus>
  );
}

export default PortfolioTable;
