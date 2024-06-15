import React from "react";
import styled from "styled-components";

const RowWrapper = styled.tr`
  /* &:nth-child(even) {
    background-color: #f9f9f9;
  } */
  background-color: var(--color-grey-1);
`;

const TableRow = ({ children }) => {
  return <RowWrapper>{children}</RowWrapper>;
};

export default TableRow;
