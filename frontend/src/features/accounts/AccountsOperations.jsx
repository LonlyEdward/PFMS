import styled from "styled-components";
import Button from "../../ui/Button";

const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
`;

function AccountsOperations() {
  return (
    <Sdiv>
      <Button>Add New Account</Button>
      <Button>New Transfer</Button>
    </Sdiv>
  );
}

export default AccountsOperations;
