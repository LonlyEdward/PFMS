import Heading from "../ui/Heading";
import Row from "../ui/Row";
import React from "react";
import RemindersTable from "../features/reminders/RemindersTable";
import RemindersOperations from "../features/reminders/RemindersOperations";

function Reminders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Reminders</Heading>
        <RemindersOperations />
      </Row>
      <RemindersTable />
    </>
  );
}

export default Reminders;
