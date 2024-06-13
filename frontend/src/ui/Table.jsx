import React from "react";
import styled from "styled-components";

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: var(--secondary-color-20);
`;

const Table = ({ children }) => {
  return <TableWrapper>{children}</TableWrapper>;
};

export default Table;
