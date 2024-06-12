import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Transactions() {
  return (
    <Row type="horizontal">
      <Heading as="h1">Transactions</Heading>
      <Button>New Transaction</Button>
    </Row>
  );
}

export default Transactions;
