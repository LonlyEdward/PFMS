import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";

import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import TableCell from "../ui/TableCell";

const SButton = styled(Button)`
  background-color: var(--primary-color-10);
  &:hover {
  background-color: var(--primary-color-30);
  }
`;

const data = [
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date: "2025-04-25",
    transaction_type: "Expense",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date: "2025-04-25",
    transaction_type: "Income",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date: "2025-04-25",
    transaction_type: "Expense",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date: "2025-04-25",
    transaction_type: "Income",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date: "2025-04-25",
    transaction_type: "Expense",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date: "2025-04-25",
    transaction_type: "Income",
  },
];

const columns = [
  "Name",
  "Description",
  "Amount",
  "Date",
  "Transaction Type",
  "Actions",
];

function Transactions() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>
        <Button>New Transaction</Button>
      </Row>

      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.transaction_type}</TableCell>
              <TableCell>
                <SButton size="small">Edit </SButton>&nbsp;
                <SButton size="small">Delete</SButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Transactions;
