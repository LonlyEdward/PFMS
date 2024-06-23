import React from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Row from "../../ui/Row";

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
  border-radius: var(--border-radius-lg);
  padding: 16px;
  margin: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: var(--color-grey-1);
  color: var(--color-grey-2);
  width: 30%;
  transition-duration: 500ms;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h2`
  margin: 0 0 8px 0;
  color: var(--color-grey-7);
`;

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

const CardBalance = styled.h3`
  margin: 0 0 8px 0;
  color: var(--color-grey-7);
`;

const CardDetail = styled.p`
  margin: 4px 0;
  color: var(--color-grey-7);
`;

const accounts = [
  {
    name: "Savings Account",
    balance: 1500.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Savings",
  },
  {
    name: "Checking Account",
    balance: 2300.75,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Checking",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
  {
    name: "Investment Account",
    balance: 12000.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "Investment",
  },
];

function AccountsCards({ account }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  return (
    <>
      <SCard>
        <CardTitle>{accounts.name}</CardTitle>
        <CardBalance>Balance: ${accounts.balance}</CardBalance>
        <CardDetail>Description: {accounts.description}</CardDetail>
        <CardDetail>Account Type: {accounts.type}</CardDetail>
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

      <Row type="wrap">
        {accounts.map((account, index) => (
          //   <AccountsCards key={index} account={accounts} />
          <div key={index} account={account}></div>
        ))}
      </Row>
    </>
  );
}

export default AccountsCards;
