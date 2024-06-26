import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

const SButton = styled(Button)`
  background-color: var(--primary-color-10);
  &:hover {
    background-color: var(--primary-color-30);
  }
`;

const CButton = styled(Button)`
  background-color: var(--color-grey-1);
  color: var(--color-grey-7);
  border: 2px solid var(--color-grey-5);

  &:hover {
    background-color: var(--color-grey-3);
    border: 2px solid var(--color-grey-6);
  }
`;

const columns = ["Name", "Description", "Date", "Actions"];

function RemindersTable() {
  const [selectedReminderId, setSelectedReminderId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  const handleOpenEditModal = (reminder) => {
    setSelectedReminderId(reminder.id);
    setFormData({
      name: reminder.name,
      date: reminder.date,
      description: reminder.description,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const [reminders, setReminders] = useState([]);

  const getReminders = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/reminders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setReminders(response.data);
  };

  useEffect(() => {
    getReminders();
  }, []);

  const deleteReminder = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/reminders/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    toast.success("Reminder deleted successfully");
    getReminders();
  };


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

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/reminders/${selectedReminderId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Reminder updated successfully");
      setShowEditModal(false);
      getReminders();
    } catch (error) {
      console.error("There was an error updating the item!", error);
      toast.error("Failed to update the reminder");
    }
  };


  return (
    <>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {reminders.map((reminder, index) => (
            <TableRow key={index}>
              <TableCell>{reminder.name}</TableCell>
              <TableCell>{reminder.description}</TableCell>
              <TableCell>{reminder.date}</TableCell>
              <TableCell>
                <SButton size="small" onClick={() => handleOpenEditModal(reminder)}>
                  Edit
                </SButton>
                &nbsp;
                <Button
                  size="small"
                  variation="danger"
                  onClick={() => deleteReminder(reminder.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        title="Edit Reminder Details"
        footer={
          <>
            <CButton onClick={handleCloseEditModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <SButton onClick={handleUpdate}>Update Reminder</SButton>
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

export default RemindersTable;
