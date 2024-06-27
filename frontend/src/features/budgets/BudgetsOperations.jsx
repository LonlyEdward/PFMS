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
import CancelButton from "../../ui/CancelButton";
import Line from "../../ui/Line";


const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
`;


function BudgetsOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewBudgetModal, setShowNewBudgetModal] = useState(false);


  const handleOpenNewBudgetModal = () => setShowNewBudgetModal(true);
  const handleCloseNewBudgetModal = () => setShowNewBudgetModal(false);



  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
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
      </Sdiv>

      <Modal
        show={showNewBudgetModal}
        handleClose={handleCloseNewBudgetModal}
        title="Create New Budget"
        footer={
          <>
            <CancelButton onClick={handleCloseNewBudgetModal}>Cancel</CancelButton>
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
          <Line />
          <FormRow label="Amount">
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </FormRow>
          <Line />
          <FormRow label="Start Date">
            <Input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </FormRow>
          <Line />
          <FormRow label="End Date">
            <Input
              type="date"
              name="end_date"
              value={formData.end_date}
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

export default BudgetsOperations;
