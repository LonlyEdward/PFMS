import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";

const StyledHeaderMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
`;



function HeaderMenu() {

  const navigate = useNavigate();

  // const [userData, setUserData] = useState({});
const [username, setUsername] = useState();

useEffect(() => {
  axios
    .get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      // setUserData(response.data);
      setUsername(response.data.username);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });
}, []);

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
          {/* <span>Profile</span> */}
          <span>{username}</span>
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
