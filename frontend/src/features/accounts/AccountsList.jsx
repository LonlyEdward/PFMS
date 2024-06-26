import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../../ui/Card";
import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Line from "../../ui/Line";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import CancelButton from "../../ui/CancelButton";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import BlueButton from "../../ui/BlueButton";

const Fdiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function AccountsList() {
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  //   const handleOpenEditModal = () => setShowEditModal(true);

  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const handleOpenEditModal = (budget) => {
    setSelectedBudgetId(budget.id);
    setFormData({
      name: budget.name,
      balance: budget.balance,
      accountype: budget.accounttype,
      description: budget.description,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const [options, setOptions] = useState([]);

  const getAccounttypes = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/accounttype/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setOptions(response.data);
  };

  useEffect(() => {
    getAccounttypes();
  }, []);

  const deleteAccount = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/accounts/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    toast.success("Account deleted successfully");
    getAccounts();
  };

  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    accounttype: "",
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
        `http://127.0.0.1:8000/api/accounts/${selectedBudgetId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Account updated successfully");
      setShowEditModal(false);
      getAccounts();
    } catch (error) {
      console.error("There was an error updating the item!", error);
      toast.error("Failed to update the account");
    }
  };

  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/accounts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setAccounts(response.data);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <Fdiv>
        {accounts.map((account) => (
          <Card
            key={account.id}
            account={account}
            // onEdit={handleOpenEditModal}
            onEdit={() => handleOpenEditModal(account)}
            onDelete={() => deleteAccount(account.id)}
          />
        ))}
      </Fdiv>
      <Modal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        title="Edit Account Details"
        footer={
          <>
            <CancelButton onClick={handleCloseEditModal}>Cancel</CancelButton>
            &nbsp;&nbsp;&nbsp;
            <BlueButton onClick={handleUpdate}>Update Account</BlueButton>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Account name">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormRow>
          <Line />
          <FormRow label="Balance">
            <Input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
            />
          </FormRow>
          <Line />
          <FormRow label="Account Type">
            <Select
              name="accounttype"
              value={formData.accounttype}
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

export default AccountsList;
