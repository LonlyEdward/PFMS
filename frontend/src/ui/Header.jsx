import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px;
  background-color: var(--color-grey-1);
  z-index: 1;
  /* border-bottom: 1px solid var(--color-grey-4); */
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
