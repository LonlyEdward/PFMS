import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Modal from "../ui/Modal";
import { useState } from "react";

function Reports() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Reports and Statistics</Heading>
      </Row>

      <h1>Reusable Modal Example</h1>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} title="My Modal" onClose={closeModal}>
        <p>This is the content of the modal.</p>
      </Modal>
    </>
  );
}

export default Reports;
