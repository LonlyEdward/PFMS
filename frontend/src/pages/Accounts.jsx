import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AccountsOperations from "../features/accounts/AccountsOperations";
import Card from "../features/accounts/Card";
import React from "react";
// import { useState } from "react";

const accounts = [
  {
    name: "Savings Account",
    balance: 1500.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Savings",
  },
  {
    name: "Checking Account",
    balance: 2300.75,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Checking",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
];

// const handleEdit = (account) => {
//   alert(`Editing: ${account.name}`);
// };

// const handleDelete = (account) => {
//   alert(`Deleting: ${account.name}`);
// };

function Accounts() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Accounts</Heading>
        <AccountsOperations />
      </Row>

      <Row type="wrap">
        {accounts.map((account, index) => (
          <Card
            key={index}
            account={account}
            // onEdit={handleEdit}
            // onDelete={handleDelete}
          />
        ))}
      </Row>


    </>
  );
}

export default Accounts;
