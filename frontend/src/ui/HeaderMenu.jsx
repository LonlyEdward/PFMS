import styled from "styled-components";
// import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const StyledHeaderMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon>
          <FaRegCircleUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon>
          <span>"Username"</span>
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/settings")}>
          <IoSettingsOutline />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon>
          <MdOutlineLogout />
        </ButtonIcon>
      </li>
      <li>{/* <Logout /> */}</li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
