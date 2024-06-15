import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineAccountBox,
  MdOutlineTimer,
} from "react-icons/md";
import { BsBarChartLine, BsCalendarCheck } from "react-icons/bs";
import { TbArrowsRightLeft } from "react-icons/tb";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    /* color: var(--color-grey-7); */
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--secondary-color-20);
    /* font-size: large; */
    border-radius: var(--border-radius-sm);
    transform: scale(1.1);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-7); //initial color
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(
      --secondary-color-20
    ); // color when current route and when hovered on
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <MdOutlineDashboard />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/accounts">
            <MdOutlineAccountBox />
            <span>Accounts</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/transactions">
            <TbArrowsRightLeft />
            <span>Transactions</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/budgets">
            <BsCalendarCheck />
            <span>Budgets</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/Reminders">
            <MdOutlineTimer />
            <span>Reminders</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/reports">
            <BsBarChartLine />
            <span>Reports</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
