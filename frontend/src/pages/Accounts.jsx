import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AccountsOperations from "../features/accounts/AccountsOperations";
import React from "react";
import AccountsList from "../features/accounts/AccountsList";

function Accounts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Accounts</Heading>
        <AccountsOperations />
      </Row>

      <AccountsList />
    </>
  );
}

export default Accounts;
