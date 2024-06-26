import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TransfersOperations from "../features/transfers/TransfersOperations";
import TransfersTable from "../features/transfers/TransfersTable";


function Transfers() {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transfers</Heading>
        <TransfersOperations />
      </Row>

      <TransfersTable />
    </>
  );
}

export default Transfers;
