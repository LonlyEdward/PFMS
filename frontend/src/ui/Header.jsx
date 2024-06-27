import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import Heading from "./Heading";

const StyledHeader = styled.header`
  padding: 0.8rem 4.9rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px;
  background-color: var(--color-grey-1);
  z-index: 1;
  /* border-bottom: 1px solid var(--color-grey-4); */
  display: flex;
  justify-content: space-between;
`;

function Header() {
  return (
    <>
      <StyledHeader>
        <Heading as="h4">Personal Finance Management System</Heading>
        <HeaderMenu />
      </StyledHeader>
    </>
  );
}

export default Header;
