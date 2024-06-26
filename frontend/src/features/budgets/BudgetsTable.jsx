import Button from "../../ui/Button";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import axios from "axios";
import toast from "react-hot-toast";

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

const Shr = styled.hr`
  border: 1px solid var(--color-grey-4);
  opacity: 0.3;
  margin: 0.2rem;
`;

const columns = [
  "Name",
  "Description",
  "Amount",
  "Date Created",
  "Start Date",
  "End Date",
  "Actions",
];

function BudgetsTable() {
  // const [showEditModal, setShowEditModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpenEditModal = (budget) => {
    setSelectedBudgetId(budget.id);
    setFormData({
      name: budget.name,
      description: budget.description,
      amount: budget.amount,
      date_created: budget.date_created,
      start_date: budget.start_date,
      end_date: budget.end_date,
    });
    setShowEditModal(true);
  };

  // const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenBudgetModal = () => setShowBudgetModal(true);
  const handleCloseBudgetModal = () => setShowBudgetModal(false);

  const [budgets, setBudgets] = useState([]);

  //Api call to get budgets from the backend
  const getBudgets = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/budgets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setBudgets(response.data);
  };

  useEffect(() => {
    getBudgets();
  }, []);

  ////////api call to delete a specific budget
  const deleteBudget = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/budgets/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    toast.success("Budget deleted successfully");
    getBudgets();
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    date_created: "",
    start_date: "",
    end_date: "",
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
        `http://127.0.0.1:8000/api/budgets/${selectedBudgetId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Budget updated successfully");
      setShowEditModal(false);
      getBudgets();
    } catch (error) {
      console.error("There was an error updating the item!", error);
      toast.error("Failed to update the Budget");
    }
  };

  return (
    <>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {budgets.map((budget, index) => (
            <TableRow key={index}>
              <TableCell>{budget.name}</TableCell>
              <TableCell>{budget.description}</TableCell>
              <TableCell>{budget.amount}</TableCell>
              <TableCell>{budget.date_created}</TableCell>
              <TableCell>{budget.start_date}</TableCell>
              <TableCell>{budget.end_date}</TableCell>
              <TableCell>
                <SButton
                  size="small"
                  onClick={() => handleOpenEditModal(budget)}
                >
                  Edit{" "}
                </SButton>
                &nbsp;
                <SButton size="small" onClick={handleOpenBudgetModal}>
                  View
                </SButton>
                &nbsp;
                <Button
                  size="small"
                  variation="danger"
                  onClick={() => deleteBudget(budget.id)}
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
        title="Edit Budget Details"
        footer={
          <>
            <CButton onClick={handleCloseEditModal}>Cancel</CButton>
            &nbsp;&nbsp;&nbsp;
            <SButton onClick={handleUpdate}>Update Budget</SButton>
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
        show={showBudgetModal}
        handleClose={handleCloseBudgetModal}
        title="Budget Entries"
        footer={
          <>
            <SButton onClick={handleCloseBudgetModal}>Close</SButton>
          </>
        }
      >
        <p>Preview of selected budget entires</p>
      </Modal>
    </>
  );
}

export default BudgetsTable;
