import styled from "styled-components";
import { useState, useEffect } from "react";
import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import axios from "axios";

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

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

const columns = [
  "Name",
  "Description",
  "Amount",
  "Date",
  "Transaction Type",
  "Actions",
];

function TransactionsTable() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    console.log(response.data);
    setTransactions(response.data);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.transactiontype}</TableCell>
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
        <Form type="modal">
          <FormRow label="Transaction name">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Amount">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Transaction Type Drop down ------>">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Description">
            <Textarea />
          </FormRow>
        </Form>
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

export default TransactionsTable;
