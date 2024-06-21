import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Title from "../../ui/Title";

const Styledul = styled.ul`
  text-align: center;
`;

const Styledspan = styled.span`
  color: var(--secondary-color-20);

  &:hover {
    color: var(--secondary-color-40);
  }
`;

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      console.log("success", response.data);
      setSuccessMessage("Registration Successfull");
    } catch (error) {
      console.log("Error during registration!", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((field) => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <Form>
        <Title>PFMS</Title>
        <Heading as="h4">Create Account</Heading>
        <FormRow label="Username" orientation="vertical">
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow label="Email" orientation="vertical">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow label="Password" orientation="vertical">
          <Input
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow label="Confirm Password" orientation="vertical">
          <Input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow orientation="vertical">
          <Button
            size="large"
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </FormRow>
        <FormRow orientation="vertical">
          <Styledul>
            <li>
              Already have an account?
              <Link to={"/Login"}>
                <Styledspan> Login</Styledspan>
              </Link>
            </li>
          </Styledul>
        </FormRow>
      </Form>
    </>
  );
}

export default SignupForm;
