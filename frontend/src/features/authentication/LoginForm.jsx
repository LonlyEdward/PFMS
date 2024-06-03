import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";

const Styledul = styled.ul`
  text-align: center;
`

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
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
         <li> Don't have an account yet? <Link to={"signup"}>Sign up</Link></li>
        </Styledul>
        {/* <p>
          Don't have an account yet? <Link to={"./signup"}>Sign up</Link>
        </p> */}
      </FormRow>
    </Form>
  );
}

export default LoginForm;
