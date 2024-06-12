import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AccountsOperations from "../features/accounts/AccountsOperations";

function Accounts() {
  return (
    <Row type="horizontal">
      <Heading as="h1">Accounts</Heading>
      <AccountsOperations />
    </Row>
  );
}

export default Accounts;
