// import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TransactionsTable from "../features/transactions/TransactionsTable";
import TransactionsOperations from "../features/transactions/TransactionsOperations"
function Transactions() {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>
        <TransactionsOperations />
      </Row>

      <TransactionsTable />
    </>
  );
}

export default Transactions;
