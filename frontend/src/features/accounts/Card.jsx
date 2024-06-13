// ReusableCard.js
import React from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';

const CardButton = styled(Button)`
  background-color: var(--primary-color-10);
  &:hover {
  background-color: var(--primary-color-30);
  }
`;

const SCard = styled.div`
  /* border-bottom: 5px solid var(--primary-color-20); */
  border-right: 3px solid var(--primary-color-20);
  border-radius: var(--border-radius-md);
  padding: 16px;
  margin: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: var(--color-grey-1);
  color: var(--color-grey-2);
  width: 30%;
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


const Card = ({ account, onEdit, onDelete }) => {
  return (
    <SCard>
      <CardTitle>{account.name}</CardTitle>
      <CardBalance>Balance: ${account.balance}</CardBalance>
      <CardDetail>Description: {account.description}</CardDetail>
      <CardDetail>Account Type: {account.type}</CardDetail>
      <CardButton size="small" onClick={() => onEdit(account)}>Edit</CardButton>&nbsp;
      <CardButton size="small" onClick={() => onDelete(account)}>Delete</CardButton>
    </SCard>
  );
};

export default Card;
