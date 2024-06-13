import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import NewAccountForm from "./NewAccountForm";

const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
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
        title="Create New Account"
        footer={
          <>
            <Button>Create Account</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={handleCloseAccountModal}>Close</Button>
          </>
        }
      >
        <NewAccountForm />
      </Modal>
      <Modal
        show={showTransferModal}
        handleClose={handleCloseTransferModal}
        title="New Transfer"
        footer={
          <>
            <Button onClick={handleCloseTransferModal}>Close</Button>
          </>
        }
      >
        <p>New Transfer Form</p>
      </Modal>
    </>
  );
}

export default AccountsOperations;
