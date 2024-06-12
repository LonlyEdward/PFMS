// import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit}>
      <Heading as="h1">Update account</Heading>
      <br />
      <Heading as="h3">Update your data</Heading>
      <FormRow label="Email address">
        <Input />
      </FormRow>
      <Shr />
      <FormRow label="Full name">
        <Input />
      </FormRow>
      <Shr />
      <FormRow label="Username">
        <Input />
      </FormRow>

      <FormRow>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
