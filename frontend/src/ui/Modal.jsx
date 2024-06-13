// CustomModal.js
import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "./Button";

// Keyframes for the modal animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

// Styled components for the modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: var(--color-grey-6);
  /* border-radius: 10px; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  /* width: 500px; */
  max-width: 80%;
  border: 5px solid var(--color-grey-1);
  /* border-radius: 5px; */
  animation: ${slideIn} 0.3s ease;
  border-radius: var(--border-radius-md);
`;

const ModalHeader = styled.div`
  padding: 1px 15px;
  /* border-bottom: 1px solid #ddd; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-1);
  color: var(--color-grey-7);
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
  color: var(--color-grey-7);
`;

const ModalBody = styled.div`
  padding: 20px;
  background-color: var(--color-grey-1);
  /* color: #000; */
`;

const ModalFooter = styled.div`
  padding: 20px;
  /* border-top: 1px solid #ddd; */
  background-color: var(--color-grey-1);
  display: flex;
  justify-content: flex-end;
`;

// Modal component
function Modal({ show, handleClose, title, children, footer }) {
  if (!show) {
    return null;
  }

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {footer || (
            <>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={() => alert("Action!")}>Save Changes</Button>
            </>
          )}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
