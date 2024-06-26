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
import Button from "../../ui/Button";
import axios from "axios";
import BlueButton from "../../ui/BlueButton";
import Line from "../../ui/Line";
import CancelButton from "../../ui/CancelButton";
import toast from "react-hot-toast";
import Select from "../../ui/Select";

function TransactionsTable() {
  const columns = [
    "Name",
    "Description",
    "Amount",
    "Date",
    "Transaction Type",
    "Actions",
  ];

  // const handleOpenEditModal = () => setShowEditModal(true);

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpenEditModal = (transaction) => {
    setSelectedTransactionId(transaction.id);
    setFormData({
      name: transaction.name,
      amount: transaction.amount,
      description: transaction.description,
      transactiontype: transaction.transactiontype,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    console.log(response.data);
    setTransactions(response.data);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/transactions/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    toast.success("Transaction deleted successfully");
    getTransactions();
  };

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    transactiontype: "",
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
        `http://127.0.0.1:8000/api/transactions/${selectedTransactionId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Transaction updated successfully");
      setShowEditModal(false);
      getTransactions();
    } catch (error) {
      console.error("There was an error updating the item!", error);
      toast.error("Failed to update the Transaction");
    }
  };

  const [options, setOptions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const getTransactiontypes = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactiontype/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    console.log(response.data);
    setOptions(response.data);
  };

  useEffect(() => {
    getTransactiontypes();
  }, []);

  return (
    <>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.transactiontype}</TableCell>
              <TableCell>
                <BlueButton
                  size="small"
                  onClick={() => handleOpenEditModal(transaction)}
                >
                  Edit
                </BlueButton>
                &nbsp;
                <Button
                  size="small"
                  variation="danger"
                  onClick={() => deleteTransaction(transaction.id)}
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
        title="Edit Transaction Details"
        footer={
          <>
            <CancelButton onClick={handleCloseEditModal}>Cancel</CancelButton>
            &nbsp;&nbsp;&nbsp;
            <BlueButton onClick={handleUpdate}>Update Transaction</BlueButton>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Transaction name">
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
          <FormRow label="Transaction Type">
            <Select
              name="transactiontype"
              value={formData.transactiontype}
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

export default TransactionsTable;
