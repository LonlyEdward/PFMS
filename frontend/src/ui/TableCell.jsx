import React from "react";
import styled from "styled-components";

const CellWrapper = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid var(--color-grey-4);
`;

const TableCell = ({ children }) => {
  return <CellWrapper>{children}</CellWrapper>;
};

export default TableCell;
