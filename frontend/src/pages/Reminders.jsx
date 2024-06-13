import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import React from "react";
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
    date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-04-25",
  },
  {
    name: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-04-25",
  },
];

const columns = ["Name", "Description", "Date", "Actions"];

function Reminders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Reminders</Heading>
        <Button>New Reminder</Button>
      </Row>

      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.date}</TableCell>
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

export default Reminders;
