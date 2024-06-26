import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import axios from "axios";
import toast from "react-hot-toast";

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
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

function BudgetsOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewBudgetModal, setShowNewBudgetModal] = useState(false);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  const handleOpenNewBudgetModal = () => setShowNewBudgetModal(true);
  const handleCloseNewBudgetModal = () => setShowNewBudgetModal(false);

  const handleOpenNewEntryModal = () => setShowNewEntryModal(true);
  const handleCloseNewEntryModal = () => setShowNewEntryModal(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    // date_created: "",
    start_date: "",
    end_date: "",
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
        url: `http://127.0.0.1:8000/api/budgets/`,
        withCredentials: true,
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then((response) => {
        console.log(response.data);
        toast.success("Budget added successfully");
        handleCloseNewBudgetModal();
      });
      // navigate("/");
    } catch (error) {
      toast.error("Error adding Budget");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <Sdiv>
        <Button onClick={handleOpenNewBudgetModal}>New Budget</Button>
        <Button onClick={handleOpenNewEntryModal}>New Entry</Button>
      </Sdiv>

      <Modal
        show={showNewBudgetModal}
        handleClose={handleCloseNewBudgetModal}
        title="Create New Budget"
        footer={
          <>
            <CButton onClick={handleCloseNewBudgetModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={handleSubmit}>Create Budget</Button>
            &nbsp;&nbsp;&nbsp;
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Budget name">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormRow>
          <Shr />
          <FormRow label="Amount">
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormRow>
          <Shr />
          <FormRow label="Start Date">
            <Input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </FormRow>
          <Shr />
          <FormRow label="End Date">
            <Input
              type="date"
              name="end_date"
              value={formData.end_date}
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
      <Modal
        show={showNewEntryModal}
        handleClose={handleCloseNewEntryModal}
        title="New Budget Entry"
        footer={
          <>
            <CButton onClick={handleCloseNewEntryModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Add Entry</Button>
          </>
        }
      >
        <Form type="modal">
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
      </Modal>
    </>
  );
}

export default BudgetsOperations;
