import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import HoldingAggRow from "./HoldingAggRow";
import { useHoldingsAgg } from "./useHoldingsAgg";

function HoldingTableAgg() {
  const { isLoading, holdingsAgg } = useHoldingsAgg();

  if (isLoading) return <Spinner />;

  if (!holdingsAgg) return <Empty resourceName="holdings" />;

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
          data={holdingsAgg}
          render={(holding) => (
            <HoldingAggRow key={holding.stock_id} holding={holding} />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={10} />
      </Table.Footer>
    </Menus>
  );
}

export default HoldingTableAgg;
