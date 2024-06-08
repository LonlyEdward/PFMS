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

function SignupForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit}>
      <Title>PFMS</Title>
      <Heading as="h4">Sign up</Heading>
      <FormRow label="Full name" orientation="vertical">
        <Input
          type="text"
          id="name"
          autoComplete="first_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Username" orientation="vertical">
        <Input
          type="text"
          id="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormRow>
      <FormRow label="Email" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="first_name"
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
        <Button size="large">Create account</Button>
      </FormRow>
      <FormRow orientation="vertical">
        <Styledul>
          <li>
            Already have an account?{" "}
            <Link to={"/Login"}>
              <Styledspan>Log in</Styledspan>
            </Link>
          </li>
        </Styledul>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
