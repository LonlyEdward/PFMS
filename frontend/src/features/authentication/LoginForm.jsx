import { useState } from "react";
import { Link } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit}>
      <Title>PFMS</Title>
      <Heading as="h4">Login to your account</Heading>
      <FormRow label="Email" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large">Login</Button>
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
  );
}

export default LoginForm;
