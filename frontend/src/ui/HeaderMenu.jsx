import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import toast from "react-hot-toast";
// import { ACCESS_TOKEN } from "../utils/constants";
// import axios from "axios";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
// import { Navigate } from "react-router-dom";

const StyledHeaderMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
`;

// const handleLogout = async () => {
//   try {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//     if (refreshToken) {
//       await axios.post("http://127.0.0.1:8000/api/logout/", {
//         refresh: refreshToken,
//       });
//       localStorage.removeItem(ACCESS_TOKEN);
//       localStorage.removeItem(REFRESH_TOKEN);
//     }
//   } catch (error) {
//     console.log("failed to logout", error);
//   }
// };

function HeaderMenu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/login");
      toast.success("Successfully Logged out");
    } catch (error) {
      console.log("failed to logout");
    }
  };

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/settings")}>
          <FaRegUser />
          &nbsp;
          <span>Profile</span>
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={handleLogout}>
          <MdOutlineLogout />
          &nbsp;
          <span>Logout</span>
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
