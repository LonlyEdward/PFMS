import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CancelButton from "../../ui/CancelButton";
import { useState, useEffect } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Line from "../../ui/Line";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Span = styled.div`
  font-size: 2rem;
  color: var(--secondary-color-20);
  margin-top: 4px;
  margin-left: 8px;
  transition-duration: 500ms;

&:hover {
  transform: scale(1.1);
  color: var(--secondary-color-30);
}
`

function TransfersOperations() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const handleOpenTransferModal = () => setShowTransferModal(true);
  const handleCloseTransferModal = () => setShowTransferModal(false);

  const [options, setOptions] = useState([]);

  const getAccounts = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/accounts/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setOptions(response.data);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    from_account: "",
    to_account: "",
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
        url: `http://127.0.0.1:8000/api/transfers/`,
        withCredentials: true,
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then((response) => {
        console.log(response.data);
        toast.success("Funds Transferred Successfully");
        handleCloseTransferModal();
      });
    } catch (error) {
      toast.error("Error Transferring Tunds");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Button onClick={handleOpenTransferModal}>New Transfer</Button>
        <Link to="/accounts"><Span>Go back</Span></Link>
      </Row>

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
            <Button onClick={handleSubmit}>Confirm Transfer</Button>
          </>
        }
      >
        <Form type="modal">
          <FormRow label="Transfer name">
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
          <FormRow label="From Account">
            <Select
              name="from_account"
              value={formData.from_account}
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
          <FormRow label="To Account">
            <Select
              name="to_account"
              value={formData.to_account}
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

export default TransfersOperations;
