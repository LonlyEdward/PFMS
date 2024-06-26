import styled from "styled-components";
import Button from "./Button";

const CancelButton = styled(Button)`
background-color: var(--color-grey-1);
color: var(--color-grey-7);
border: 2px solid var(--color-grey-5);

&:hover {
  background-color: var(--color-grey-3);
  border: 2px solid var(--color-grey-6);
}
`;

export default CancelButton;