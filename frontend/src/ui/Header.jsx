import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-2);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-4);
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
