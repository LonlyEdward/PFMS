import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BudgetsOperations from "../features/budgets/BudgetsOperations";
import Button from "../ui/Button";
import styled from "styled-components";

import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import TableCell from "../ui/TableCell";
import Modal from "../ui/Modal";
import { useState } from "react";
import EditBudgetForm from "../features/budgets/EditBudgetForm";

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
  "Date Created",
  "Start Date",
  "End Date",
  "Actions",
];

function Budgets() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleOpenBudgetModal = () => setShowBudgetModal(true);
  const handleCloseBudgetModal = () => setShowBudgetModal(false);

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
        <EditBudgetForm />
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

export default Budgets;
