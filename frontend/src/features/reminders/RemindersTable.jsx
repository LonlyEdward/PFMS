import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

// import { useCallback } from "react";

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  //   const [items, setItems] = useState([]);
  //
  //   useEffect(() => {
  //     const fetchItems = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://127.0.0.1:8000/api/reminders/",
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("access")}`,
  //             },
  //           }
  //         );
  //         setItems(response.data);
  //         console.log(items);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchItems();
  //   }, [items]);

  // const [reminders, setReminders] = useState([]);

  // useEffect(() => {
  //   getReminders();
  // }, []);

  // const getReminders = async () => {
  //   try {
  // const response = await axios.get("http://127.0.0.1:8000/api/reminders/", {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("access")}`,
  //   },
  // });
  //     setReminders(response.data);
  //     console.log(reminders);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

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
                <SButton size="small" onClick={handleOpenEditModal}>
                  Edit
                </SButton>
                &nbsp;
                <Button
                  size="small"
                  variation="danger"
                  onClick={handleOpenDeleteModal}
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
            <SButton>Update Reminder</SButton>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Reminder name">
            <Input />
          </FormRow>
          <Shr />
          <FormRow label="Date">
            <Input type="date" />
          </FormRow>
          <Shr />
          <FormRow label="Description">
            <Textarea />
          </FormRow>
        </Form>
      </Modal>
      <Modal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        title="Delete Reminder"
        footer={
          <>
            <CButton onClick={handleCloseDeleteModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button variation="danger">Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to proceed? This action cannot be undone.</p>
      </Modal>
    </>
  );
}

export default RemindersTable;
