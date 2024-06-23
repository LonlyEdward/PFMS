import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
// import NewBudgetForm from "../budgets/NewBudgetForm";
// import NewEntryForm from "../budgets/NewEntryForm";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

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
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  const handleOpenNewBudgetModal = () => setShowNewBudgetModal(true);
  const handleCloseNewBudgetModal = () => setShowNewBudgetModal(false);

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
        <Form type="modal">
          <FormRow label="Entry name">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Amount">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Which Budget Drop down ------>">
            <Input />
          </FormRow>
        </Form>
      </Modal>
    </>
  );
}

export default BudgetsOperations;
