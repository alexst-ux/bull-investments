/* eslint-disable react/prop-types */
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import HoldingStockRow from "./HoldingStockRow";

function HoldingStockTable({ holdings }) {
  return (
    <Menus>
      <Table columns="6fr 1.2fr 0.5fr">
        <Table.Header>
          <div>Holding</div>
          <div>P/L, Price</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={holdings}
          render={(holding) => (
            <HoldingStockRow key={holding.id} holding={holding} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default HoldingStockTable;
