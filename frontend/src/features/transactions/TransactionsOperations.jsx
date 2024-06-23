import { useState } from "react";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

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

function TransactionsOperations() {
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const handleOpenNewTransactionModal = () => setShowNewTransactionModal(true);
  const handleCloseNewTransactionModal = () =>
    setShowNewTransactionModal(false);
  return (
    <>
      <Button onClick={handleOpenNewTransactionModal}>New Transaction</Button>
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
    </>
  );
}

export default TransactionsOperations;
