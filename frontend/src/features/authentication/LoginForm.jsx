import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

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

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://127.0.0.1:8000/api/login/",
        formData
      );
      console.log("success", response.data);
      setSuccessMessage("Login Successfull");
      localStorage.setItem(ACCESS_TOKEN, response.data.tokens.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.tokens.refresh);
      navigate("/dashboard");
      // localStorage.setItem("access", response.data.tokens.access);
      // localStorage.setItem("refreshToken", response.data.tokens.refresh);
      // navigate("/dashboard");
    } catch (error) {
      console.log("Error during login!", error.response?.data);
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
        <Heading as="h4">Login to your account</Heading>
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
            name="password"
            value={formData.password}
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
            Login
          </Button>
        </FormRow>
        <FormRow orientation="vertical">
          <Styledul>
            <li>
              Don't have an account yet?
              <Link to={"/SignUp"}>
                <Styledspan> Sign up</Styledspan>
              </Link>
            </li>
          </Styledul>
        </FormRow>
      </Form>
    </>
  );
}

export default LoginForm;
