import styled from "styled-components";
import Button from "../../ui/Button";
import { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Line from "../../ui/Line";
import CancelButton from "../../ui/CancelButton";
import axios from "axios";
import toast from "react-hot-toast";
import Select from "../../ui/Select";

const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
`;

function AccountsOperations() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const handleOpenAccountModal = () => setShowAccountModal(true);
  const handleCloseAccountModal = () => setShowAccountModal(false);

  const handleOpenTransferModal = () => setShowTransferModal(true);
  const handleCloseTransferModal = () => setShowTransferModal(false);

  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/accounts/`,
        withCredentials: true,
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then((response) => {
        console.log(response.data);
        toast.success("Account added successfully");
        handleCloseAccountModal();
      });
    } catch (error) {
      toast.error("Error adding Account");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sdiv>
        <Button onClick={handleOpenAccountModal}>Add New Account</Button>
        <Button onClick={handleOpenTransferModal}>New Transfer</Button>
      </Sdiv>

      <Modal
        show={showAccountModal}
        handleClose={handleCloseAccountModal}
        title="Add New Account"
        footer={
          <>
            <CancelButton onClick={handleCloseAccountModal}>
              Cancel
            </CancelButton>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={handleSubmit}>Add Account</Button>
            &nbsp;&nbsp;&nbsp;
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
      <Modal
        show={showTransferModal}
        handleClose={handleCloseTransferModal}
        title="New Transfer"
        footer={
          <>
            <CancelButton onClick={handleCloseTransferModal}>
              Cancel
            </CancelButton>
            &nbsp;&nbsp;&nbsp;
            <Button>Confirm Transfer</Button>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Transfer name">
            <Input />
          </FormRow>
          <Line />
          <FormRow label="Amount">
            <Input />
          </FormRow>
          <Line />
          <FormRow label="From Account Drop down ------>">
            <Input />
          </FormRow>
          <FormRow label="To Account Drop down ------>">
            <Input />
          </FormRow>
          <Line />
          <FormRow label="Description">
            <Textarea />
          </FormRow>
        </Form>
      </Modal>
    </>
  );
}

export default AccountsOperations;
