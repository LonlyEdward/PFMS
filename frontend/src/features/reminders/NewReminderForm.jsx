import { useState } from "react";
import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
// import { ACCESS_TOKEN } from "../../utils/constants";

// import axios from "axios";

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

function NewReminderForm() {
  

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // function handleSubmit() {}

  return (
    <Form type="modal">
      <FormRow label="Reminder name">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormRow>
      <Shr />
      <FormRow label="Date">
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </FormRow>
      <Shr />
      <FormRow label="Description">
        <Textarea
          name="date"
          value={formData.description}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow>
        <Button
        // size="large"
        // type="submit"
        // disabled={isLoading}
        // onClick={handleSubmit}
        >
          Add Reminder
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewReminderForm;
