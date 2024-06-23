import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
`;

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
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

function AccountsOperations() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const handleOpenAccountModal = () => setShowAccountModal(true);
  const handleCloseAccountModal = () => setShowAccountModal(false);

  const handleOpenTransferModal = () => setShowTransferModal(true);
  const handleCloseTransferModal = () => setShowTransferModal(false);

  return (
    <>
      <Sdiv>
        <Button onClick={handleOpenAccountModal}>Add New Account</Button>
        <Button onClick={handleOpenTransferModal}>New Transfer</Button>
      </Sdiv>

      <Modal
        show={showAccountModal}
        handleClose={handleCloseAccountModal}
        title="Add New Account"
        footer={
          <>
            <CButton onClick={handleCloseAccountModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Add Account</Button>&nbsp;&nbsp;&nbsp;
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Account name">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Balance">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Account Type Drop down ------>">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Description">
            <Textarea />
          </FormRow>
        </Form>
      </Modal>
      <Modal
        show={showTransferModal}
        handleClose={handleCloseTransferModal}
        title="New Transfer"
        footer={
          <>
            <CButton onClick={handleCloseTransferModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Confirm Transfer</Button>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Transfer name">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Amount">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="From Account Drop down ------>">
            <Input />
          </FormRow>
          <FormRow label="To Account Drop down ------>">
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

export default AccountsOperations;
