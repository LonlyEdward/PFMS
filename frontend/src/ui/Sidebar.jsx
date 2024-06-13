import styled from "styled-components";
import MainNav from "./MainNav";
import Title from "./Title";

const StyledSidebar = styled.aside`
  /* background-color: var(--primary-color-50); */
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-1);
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  /* border-right: 1px solid var(--primary-color-50); */

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  z-index: 2;
`;

const DashTitle = styled(Title)`
  font-size: 5rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <DashTitle>PFMS</DashTitle>
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
