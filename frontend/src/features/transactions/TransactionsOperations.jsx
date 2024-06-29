import { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import axios from "axios";
import CancelButton from "../../ui/CancelButton";
import Line from "../../ui/Line";
import toast from "react-hot-toast";

function TransactionsOperations() {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const handleOpenNewTransactionModal = () => setShowNewTransactionModal(true);
  const handleCloseNewTransactionModal = () =>
    setShowNewTransactionModal(false);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    transactiontype: "",
    date: "",
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
        url: `http://127.0.0.1:8000/api/transactions/`,
        withCredentials: true,
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then((response) => {
        console.log(response.data);
        toast.success("Transaction added successfully");
        handleCloseNewTransactionModal();
      });
    } catch (error) {
      toast.error("Error adding Transaction");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpenNewTransactionModal}>New Transaction</Button>
      <Modal
        show={showNewTransactionModal}
        handleClose={handleCloseNewTransactionModal}
        title="New Transaction"
        footer={
          <>
            <CancelButton onClick={handleCloseNewTransactionModal}>
              Cancel
            </CancelButton>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={handleSubmit}>Record Transaction</Button>
            &nbsp;&nbsp;&nbsp;
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

export default TransactionsOperations;
