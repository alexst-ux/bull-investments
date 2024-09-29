import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddHolding from "../features/holdings/AddHolding";
import HoldingTableAgg from "../features/holdings/HoldingTableAgg";

function Holdings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All holdings</Heading>
        {/* <HoldingTableOperations /> */}
      </Row>

      <Row>
        <HoldingTableAgg />
        <AddHolding />
      </Row>
    </>
  );
}

export default Holdings;
