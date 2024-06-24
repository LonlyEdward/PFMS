import React from "react";
import styled from "styled-components";

const CellWrapper = styled.td`
  padding: 10px;
  text-align: center;
  /* border: 1px solid var(--color-grey-4); */
  /* border-bottom: 1px solid var(--secondary-color-20); */
  border-bottom: 1px solid var(--color-grey-5);
  border-right: 1px solid var(--color-grey-5);
`;

const TableCell = ({ children }) => {
  return <CellWrapper>{children}</CellWrapper>;
};

export default TableCell;
