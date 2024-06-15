import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import { useState } from "react";
import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import TableCell from "../ui/TableCell";
import Modal from "../ui/Modal";
import NewTransactionForm from "../features/transactions/NewTransactionForm";
import EditTransactionForm from "../features/transactions/EditTransactionForm";

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
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const handleOpenNewTransactionModal = () => setShowNewTransactionModal(true);
  const handleCloseNewTransactionModal = () =>
    setShowNewTransactionModal(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>
        <Button onClick={handleOpenNewTransactionModal}>New Transaction</Button>
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
                <SButton size="small" onClick={handleOpenEditModal}>
                  Edit
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
        show={showNewTransactionModal}
        handleClose={handleCloseNewTransactionModal}
        title="New Transaction"
        footer={
          <>
            <CButton onClick={handleCloseNewTransactionModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Record Transaction</Button>&nbsp;&nbsp;&nbsp;
          </>
        }
      >
        <NewTransactionForm />
      </Modal>

      <Modal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        title="Edit Transaction Details"
        footer={
          <>
            <CButton onClick={handleCloseEditModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <SButton>Update Transaction</SButton>
          </>
        }
      >
        <EditTransactionForm />
      </Modal>
      <Modal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        title="Delete Transaction"
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

export default Transactions;
