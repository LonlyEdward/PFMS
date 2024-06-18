import React from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useState } from "react";
import EditAccountForm from "./EditAccountForm";

const CardButton = styled(Button)`
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

const SCard = styled.div`
  /* border-top: 1px solid var(--primary-color-20); */
  /* border: 1px solid var(--secondary-color-20); */
  border-radius: var(--border-radius-lg);
  padding: 16px;
  margin: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px; */
  /* box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px; */
  background-color: var(--color-grey-1);
  color: var(--color-grey-2);
  width: 30%;
  /* box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12); */
  transition-duration: 500ms;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h2`
  margin: 0 0 8px 0;
  color: var(--color-grey-7);
`;

const CardBalance = styled.h3`
  margin: 0 0 8px 0;
  color: var(--color-grey-7);
`;

const CardDetail = styled.p`
  margin: 4px 0;
  color: var(--color-grey-7);
`;

const Card = ({ account }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <>
      <SCard>
        <CardTitle>{account.name}</CardTitle>
        <CardBalance>Balance: ${account.balance}</CardBalance>
        <CardDetail>Description: {account.description}</CardDetail>
        <CardDetail>Account Type: {account.type}</CardDetail>
        <CardButton size="small" onClick={handleOpenEditModal}>
          Edit
        </CardButton>
        &nbsp;
        <Button size="small" variation="danger" onClick={handleOpenDeleteModal}>
          Delete
        </Button>
      </SCard>

      <Modal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        title="Edit Account Details"
        footer={
          <>
            <CButton onClick={handleCloseEditModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <CardButton>Update Account</CardButton>
          </>
        }
      >
        <EditAccountForm />
      </Modal>
      <Modal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        title="Delete Account"
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
};

export default Card;
