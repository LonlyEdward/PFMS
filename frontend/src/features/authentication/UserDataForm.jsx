// import { useState } from "react";
import { useState, useEffect } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import axios from "axios";
import Line from "../../ui/Line";

function UserDataForm() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <Form>
      <Heading as="h1">Your information</Heading>
      <br />
      <Heading as="h3">Email and username</Heading>
      <FormRow label="Email address">
        <Input type="email" value={userData.email} readOnly />
      </FormRow>
      <Line />
      <FormRow label="Username">
        <Input type="username" value={userData.username} readOnly />
      </FormRow>
      <br />
    </Form>
  );
}

export default UserDataForm;
