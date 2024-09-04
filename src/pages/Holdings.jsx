import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddHolding from "../features/holdings/AddHolding";

function Holdings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Holdings</Heading>
        {/* <HoldingTableOperations /> */}
      </Row>

      <Row>
        {/* <HoldingTable /> */}
        <AddHolding />
      </Row>
    </>
  );
}

export default Holdings;
