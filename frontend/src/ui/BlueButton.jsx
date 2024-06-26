import styled from "styled-components";
import Button from "./Button";

const BlueButton = styled(Button)`
background-color: var(--primary-color-10);
&:hover {
  background-color: var(--primary-color-30);
}
`;


export default BlueButton;