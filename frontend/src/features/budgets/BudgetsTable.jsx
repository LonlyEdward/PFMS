import Button from "../../ui/Button";
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
  "Date Created",
  "Start Date",
  "End Date",
  "Actions",
];

function BudgetsTable() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleOpenBudgetModal = () => setShowBudgetModal(true);
  const handleCloseBudgetModal = () => setShowBudgetModal(false);

  const [budgets, setBudgets] = useState([]);

  const getBudgets = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/budgets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setBudgets(response.data);
  };

  useEffect(() => {
    getBudgets();
  }, []);

  return (
    <>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {budgets.map((budget, index) => (
            <TableRow key={index}>
              <TableCell>{budget.name}</TableCell>
              <TableCell>{budget.description}</TableCell>
              <TableCell>{budget.amount}</TableCell>
              <TableCell>{budget.date_created}</TableCell>
              <TableCell>{budget.start_date}</TableCell>
              <TableCell>{budget.end_date}</TableCell>
              <TableCell>
                <SButton size="small" onClick={handleOpenEditModal}>
                  Edit{" "}
                </SButton>
                &nbsp;
                <SButton size="small" onClick={handleOpenBudgetModal}>
                  View
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
        title="Edit Budget Details"
        footer={
          <>
            <CButton onClick={handleCloseEditModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <SButton>Update Budget</SButton>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Budget name">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Amount">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Start Date">
            <Input type="date" />
          </FormRow>
          <Shr />
          <FormRow label="End Date">
            <Input type="date" />
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
        title="Delete Budget"
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
      <Modal
        show={showBudgetModal}
        handleClose={handleCloseBudgetModal}
        title="Budget Entries"
        footer={
          <>
            <SButton onClick={handleCloseBudgetModal}>Close</SButton>
          </>
        }
      >
        <p>Preview of selected budget entires</p>
      </Modal>
    </>
  );
}

export default BudgetsTable;
