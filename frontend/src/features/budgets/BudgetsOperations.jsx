import styled from "styled-components";
import Button from "../../ui/Button";

const Sdiv = styled.div`
  display: flex;
  gap: 2rem;
`;

function BudgetsOperations() {
  return (
    <Sdiv>
      <Button>Create New Budget</Button>
      <Button>New Entry</Button>
    </Sdiv>
  );
}

export default BudgetsOperations;
