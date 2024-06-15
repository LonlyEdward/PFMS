// import { useState } from "react";
import styled from "styled-components";

// import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
// import Heading from "../../ui/Heading";

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

function NewEntryForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  function handleSubmit() {}

  return (
    <Form type="modal" onSubmit={handleSubmit}>
      <FormRow label="Entry name">
        <Input />
      </FormRow>
      <Shr />
      <FormRow label="Amount">
        <Input />
      </FormRow>
      <Shr />
      <FormRow label="Which Budget Drop down ------>">
        <Input />
      </FormRow>
    </Form>
  );
}

export default NewEntryForm;
