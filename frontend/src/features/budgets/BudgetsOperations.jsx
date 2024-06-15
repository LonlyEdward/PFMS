import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import NewBudgetForm from "../budgets/NewBudgetForm";
import NewEntryForm from "../budgets/NewEntryForm";
import Modal from "../../ui/Modal";

const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
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

function BudgetsOperations() {
  const [showNewBudgetModal, setShowNewBudgetModal] = useState(false);
  // const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  const handleOpenNewBudgetModal = () => setShowNewBudgetModal(true);
  const handleCloseNewBudgetModal = () => setShowNewBudgetModal(false);

  // const handleOpenBudgetModal = () => setShowBudgetModal(true);
  // const handleCloseBudgetModal = () => setShowBudgetModal(false);

  const handleOpenNewEntryModal = () => setShowNewEntryModal(true);
  const handleCloseNewEntryModal = () => setShowNewEntryModal(false);

  return (
    <>
      <Sdiv>
        <Button onClick={handleOpenNewBudgetModal}>New Budget</Button>
        <Button onClick={handleOpenNewEntryModal}>New Entry</Button>
      </Sdiv>

      <Modal
        show={showNewBudgetModal}
        handleClose={handleCloseNewBudgetModal}
        title="Create New Budget"
        footer={
          <>
            <CButton onClick={handleCloseNewBudgetModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Create Budget</Button>&nbsp;&nbsp;&nbsp;
          </>
        }
      >
        <NewBudgetForm />
      </Modal>
      <Modal
        show={showNewEntryModal}
        handleClose={handleCloseNewEntryModal}
        title="New Budget Entry"
        footer={
          <>
            <CButton onClick={handleCloseNewEntryModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Add Entry</Button>
          </>
        }
      >
        <NewEntryForm />
      </Modal>
    </>
  );
}

export default BudgetsOperations;
