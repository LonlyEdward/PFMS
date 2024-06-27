import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CancelButton from "../../ui/CancelButton";
import Line from "../../ui/Line";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import axios from "axios";


function RemindersOperations() {
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
            <CancelButton onClick={handleCloseNewReminderModal}>Cancel</CancelButton>
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
          <Line />
          <FormRow label="Date">
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </FormRow>
          <Line />
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
