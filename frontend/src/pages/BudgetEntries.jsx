import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "../ui/Table";
import TableHeader from "../ui/TableHeader";
import TableRow from "../ui/TableRow";
import TableCell from "../ui/TableCell";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Line from "../ui/Line";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import CancelButton from "../ui/CancelButton";
import styled from "styled-components";
import toast from "react-hot-toast";
import Select from "../ui/Select";
import { useNavigate } from "react-router-dom";

const Sdiv = styled.div`
  display: flex;
`;

const BudgetEntries = () => {
  const navigate = useNavigate();
  const columns = ["Name", "Amount"];

  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const handleOpenNewEntryModal = () => setShowNewEntryModal(true);
  const handleCloseNewEntryModal = () => setShowNewEntryModal(false);

  const { budgetId } = useParams();
  const [entries, setEntries] = useState([]);
  const [budgetName, setBudgetName] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/budgets/${budgetId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBudgetName(response.data.name);
      })
      .catch((error) => {
        console.error("There was an error fetching the budget!", error);
      });

    axios
      .get(`http://127.0.0.1:8000/api/budgets/${budgetId}/entries/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        setEntries(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the budget entries!", error);
      });
  }, [budgetId]);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    budget: "",
  });

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBudgets = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/budgets/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setOptions(response.data);
  };

  useEffect(() => {
    getBudgets();
  }, []);

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
        url: `http://127.0.0.1:8000/api/budget-entries/create/`,
        withCredentials: true,
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then((response) => {
        console.log(response.data);
        toast.success("Entry added successfully");
        handleCloseNewEntryModal();
      });
    } catch (error) {
      toast.error("Error adding entry");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading>Budget Entries for the budget {budgetName}</Heading>
        <Sdiv>
          <Button onClick={handleOpenNewEntryModal}>New Entry</Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={() => navigate("/budgets")}>Go Back</Button>
        </Sdiv>
      </Row>
      ;
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {entries?.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.amount}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Modal
        show={showNewEntryModal}
        handleClose={handleCloseNewEntryModal}
        title="New Budget Entry"
        footer={
          <>
            <CancelButton onClick={handleCloseNewEntryModal}>
              Cancel
            </CancelButton>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={handleSubmit}>Add Entry</Button>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Entry name">
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
          <FormRow label="Budget">
            <Select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">--Select an option--</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </FormRow>
        </Form>
      </Modal>
    </>
  );
};

export default BudgetEntries;
