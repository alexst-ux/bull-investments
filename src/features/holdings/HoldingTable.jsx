/* eslint-disable react/prop-types */
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import HoldingRow from "./HoldingRow";

function HoldingTable({ holdings, avrgHoldings }) {
  return (
    <Menus>
      <Table columns="6fr 14rem 0.5fr">
        <Table.Header>
          <div>Holding</div>
          <div>Price, P/L</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={Object.keys(avrgHoldings)}
          render={(hKey) => (
            <HoldingRow
              key={hKey}
              symbol={hKey}
              avrgHolding={{ [hKey]: avrgHoldings[hKey] }}
              holdings={holdings.filter((el) => el.stock.symbol === hKey)}
              stockId={avrgHoldings[hKey].stock_id}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default HoldingTable;
