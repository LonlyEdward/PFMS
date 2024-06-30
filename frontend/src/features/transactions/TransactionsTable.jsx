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
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";

function TransactionsTable() {
  const columns = [
    "Name",
    "Description",
    "Amount",
    "Date",
    "Transaction Type",
    "Actions",
  ];

  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    transactiontype: "",
    date: "",
  });
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTransactions();
    getTransactiontypes(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedType]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const getTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/transactions/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          params: {
            month: selectedMonth,
            type: selectedType,
          },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactiontypes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/transactiontype/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching transaction types: ", error);
    }
  };

  const handleOpenEditModal = (transaction) => {
    setSelectedTransactionId(transaction.id);
    setFormData({
      name: transaction.name,
      amount: transaction.amount,
      description: transaction.description,
      transactiontype: transaction.transactiontype,
      date: transaction.date,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/transactions/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      toast.success("Transaction deleted successfully");
      getTransactions();
    } catch (error) {
      console.error("Error deleting transaction: ", error);
      toast.error("Failed to delete the transaction");
    }
  };

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
      console.error("Error updating transaction: ", error);
      toast.error("Failed to update the transaction");
    }
  };

  return (
    <>
      <Row type="wrap">
        <Select name="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select Month</option>
          {monthOptions.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Select>
        <Select name="type" value={selectedType} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </Row>

      {isLoading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <Heading as="h4">No transactions found.</Heading>
      ) : (
        <Table>
          <TableHeader columns={columns} />
          <tbody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.transactiontype_name}</TableCell>
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
      )}

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
          <FormRow label="Transaction Date">
            <Input
              type="date"
              name="date"
              value={formData.date}
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
