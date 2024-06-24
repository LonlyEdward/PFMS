import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.thead`
  /* background-color: yellow; */
`;

const HeaderCell = styled.th`
  padding: 0.8rem;
  text-align: center;
  color: var(--color-grey-3);
  background-color: var(--secondary-color-30);
  border-right: 1px solid var(--color-grey-5);
`;

const TableHeader = ({ columns }) => {
  return (
    <HeaderWrapper>
      <tr>
        {columns.map((col) => (
          <HeaderCell key={col}>{col}</HeaderCell>
        ))}
      </tr>
    </HeaderWrapper>
  );
};

export default TableHeader;
