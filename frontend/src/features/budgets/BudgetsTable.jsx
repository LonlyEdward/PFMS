import Button from "../../ui/Button";
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
import BlueButton from "../../ui/BlueButton";
import CancelButton from "../../ui/CancelButton";
import Line from "../../ui/Line";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // const [showBudgetModal, setShowBudgetModal] = useState(false);

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

  const handleCloseEditModal = () => setShowEditModal(false);

  // const handleOpenBudgetModal = () => setShowBudgetModal(true);
  // const handleCloseBudgetModal = () => setShowBudgetModal(false);

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

  //api call to delete a specific budget
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

  const viewEntries = (budgetId) => {
    navigate(`/budgets/${budgetId}/entries`);
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
                <BlueButton
                  size="small"
                  onClick={() => handleOpenEditModal(budget)}
                >
                  Edit{" "}
                </BlueButton>
                &nbsp;
                <BlueButton size="small" onClick={() => viewEntries(budget.id)}>
                  View Entries
                </BlueButton>
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
            <CancelButton onClick={handleCloseEditModal}>Cancel</CancelButton>
            &nbsp;&nbsp;&nbsp;
            <BlueButton onClick={handleUpdate}>Update Budget</BlueButton>
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
      {/* <Modal
        show={showBudgetModal}
        handleClose={handleCloseBudgetModal}
        title="Budget Entries"
        footer={
          <>
            <BlueButton onClick={handleCloseBudgetModal}>Close</BlueButton>
          </>
        }
      >
        <p>Preview of selected budget entires</p>
      </Modal> */}
    </>
  );
}

export default BudgetsTable;
