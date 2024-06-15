import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import React from "react";
import styled from "styled-components";
import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import TableCell from "../ui/TableCell";
import { useState } from "react";
import NewReminderForm from "../features/reminders/NewReminderForm";
import EditReminderForm from "../features/reminders/EditReminderForm";
import Modal from "../ui/Modal";

const SButton = styled(Button)`
  background-color: var(--primary-color-10);
  &:hover {
    background-color: var(--primary-color-30);
  }
`;

const CButton = styled(Button)`
  background-color: var(--color-grey-1);
  color: var(--color-grey-7);
  border: 2px solid var(--color-grey-5);

  &:hover {
    background-color: var(--color-grey-3);
    border: 2px solid var(--color-grey-6);
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
  const [showNewReminderModal, setShowNewReminderModal] = useState(false);

  const handleOpenNewReminderModal = () => setShowNewReminderModal(true);
  const handleCloseNewReminderModal = () => setShowNewReminderModal(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Reminders</Heading>
        <Button onClick={handleOpenNewReminderModal}>New Reminder</Button>
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
                <SButton size="small" onClick={handleOpenEditModal}>
                  Edit{" "}
                </SButton>
                &nbsp;
                <Button
                  size="small"
                  variation="danger"
                  onClick={handleOpenDeleteModal}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showNewReminderModal}
        handleClose={handleCloseNewReminderModal}
        title="New Reminder"
        footer={
          <>
            <CButton onClick={handleCloseNewReminderModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Add Reminder</Button>&nbsp;&nbsp;&nbsp;
          </>
        }
      >
        <NewReminderForm />
      </Modal>

      <Modal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        title="Edit Reminder Details"
        footer={
          <>
            <CButton onClick={handleCloseEditModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <SButton>Update Reminder</SButton>
          </>
        }
      >
        <EditReminderForm />
      </Modal>
      <Modal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        title="Delete Reminder"
        footer={
          <>
            <CButton onClick={handleCloseDeleteModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button variation="danger">Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to proceed? This action cannot be undone.</p>
      </Modal>
    </>
  );
}

export default Reminders;
