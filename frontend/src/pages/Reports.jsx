import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Modal from "../ui/Modal";
import { useState } from "react";
import React from "react";
import Button from "../ui/Button";

function Reports() {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Reports and Statistics</Heading>
      </Row>


      <button onClick={handleOpenModal}>Open Modal</button>
      
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        title="Example Modal"
        footer={
          <>
            <Button onClick={handleCloseModal}>Close</Button>
            {/* <Button onClick={() => alert('Saving changes...')}>Save Changes</Button> */}
          </>
        }
      >
        <p>This is the content of the modal. You can add any React elements here.</p>
      </Modal>
    </>
  );
}

export default Reports;
