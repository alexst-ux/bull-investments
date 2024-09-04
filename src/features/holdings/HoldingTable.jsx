/* eslint-disable react/prop-types */
import Table from "../../ui/Table";
import HoldingRow from "./HoldingRow";

function HoldingTable({ holdings, avrgHoldings, currency }) {
  return (
    <Table columns="6fr 14rem">
      <Table.Header>
        <div>Holding</div>
        <div>Price, P/L</div>
      </Table.Header>

      <Table.Body
        data={Object.keys(avrgHoldings)}
        render={(hKey) => (
          <HoldingRow
            key={hKey}
            symbol={hKey}
            avrgHolding={{ [hKey]: avrgHoldings[hKey] }}
            holdings={holdings.filter((el) => el.stock.symbol === hKey)}
            currency={currency}
          />
        )}
      />
    </Table>
  );
}

export default HoldingTable;
