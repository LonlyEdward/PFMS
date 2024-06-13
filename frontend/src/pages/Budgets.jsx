import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BudgetsOperations from "../features/budgets/BudgetsOperations";
import Button from "../ui/Button";
import styled from "styled-components";

import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import TableCell from "../ui/TableCell";


const SButton = styled(Button)`
  background-color: var(--primary-color-20);
  &:hover {
    background-color: var(--primary-color-40);
  }
`;


const data = [
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date_created: "2025-04-25",
    start_date: "2025-04-25",
    end_date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date_created: "2025-04-25",
    start_date: "2025-04-25",
    end_date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date_created: "2025-04-25",
    start_date: "2025-04-25",
    end_date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date_created: "2025-04-25",
    start_date: "2025-04-25",
    end_date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date_created: "2025-04-25",
    start_date: "2025-04-25",
    end_date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date_created: "2025-04-25",
    start_date: "2025-04-25",
    end_date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    amount: 1000000,
    date_created: "2025-04-25",
    start_date: "2025-04-25",
    end_date: "2025-04-25",
  },
];

const columns = [
  "Name",
  "Description",
  "Amount",
  "Date Creaed",
  "Start Date",
  "End Date",
  "Actions",
];

function Budgets() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Budgets</Heading>
        <BudgetsOperations />
      </Row>

      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.date_created}</TableCell>
              <TableCell>{row.start_date}</TableCell>
              <TableCell>{row.end_date}</TableCell>
              <TableCell>
                <SButton size="small">Edit </SButton>&nbsp;
                <SButton size="small">Delete</SButton>&nbsp;
                <SButton size="small">View</SButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Budgets;
