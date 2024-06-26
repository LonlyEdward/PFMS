import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CButton = styled(Button)`
  background-color: var(--color-grey-1);
  color: var(--color-grey-7);
  border: 2px solid var(--color-grey-5);

  &:hover {
    background-color: var(--color-grey-3);
    border: 2px solid var(--color-grey-6);
  }
`;

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

function RemindersOperations() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewReminderModal, setShowNewReminderModal] = useState(false);
  const handleOpenNewReminderModal = () => setShowNewReminderModal(true);
  const handleCloseNewReminderModal = () => setShowNewReminderModal(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
  });

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
      await axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/reminders/`,
        withCredentials: true,
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then((response) => {
        console.log(response.data);
        toast.success("Reminder added successfully");
        handleCloseNewReminderModal();
      });
      navigate("/");
    } catch (error) {
      toast.error("Error adding reminder");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpenNewReminderModal}>Add Reminder</Button>

      <Modal
        show={showNewReminderModal}
        handleClose={handleCloseNewReminderModal}
        title="New Reminder"
        footer={
          <>
            <CButton onClick={handleCloseNewReminderModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={handleSubmit}>Add Reminder</Button>
          </>
        }
      >
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
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormRow>
        </Form>
      </Modal>
    </>
  );
}

export default RemindersOperations;
