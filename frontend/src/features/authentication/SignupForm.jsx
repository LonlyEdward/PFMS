import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Title from "../../ui/Title";
import SpinnerMini from "../../ui/SpinnerMini";

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
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Error during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form>
        <Title>PFMS</Title>
        <Heading as="h4">Register</Heading>
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
            {!isLoading ? "Sign up" : <SpinnerMini />}
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
