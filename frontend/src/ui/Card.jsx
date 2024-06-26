// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from "styled-components";
import Button from "./Button";
import BlueButton from "./BlueButton";

const CardContainer = styled.div`
  border-radius: var(--border-radius-lg);
  padding: 16px;
  margin: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: var(--color-grey-1);
  color: var(--color-grey-2);
  width: 28%;
  transition-duration: 500ms;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardHeader = styled.h2`
  margin: 0 0 8px 0;
  color: var(--color-grey-7);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-grey-7);
`;

const CardContent = styled.div`
  /* margin: 10px 0; */
  margin: 4px 0;
  color: var(--color-grey-7);
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  /* margin-top: 0px; */
`;


const Card = ({ account, onEdit, onDelete }) => (
  <CardContainer>
    <CardHeader>{account.name}</CardHeader>
    <CardContent>Description: {account.description}</CardContent>
    <CardContent>Balance: {account.balance}</CardContent>
    <CardContent>Last Updated: {account.date_updated}</CardContent>
    <CardContent>Account Type: {account.accounttype}</CardContent>
    <CardActions>
      <BlueButton size="small" onClick={() => onEdit(account.id)}>Edit</BlueButton>&nbsp;&nbsp;
      <Button size="small" variation="danger" onClick={() => onDelete(account.id)}>Delete</Button>
    </CardActions>
  </CardContainer>
);

export default Card;
