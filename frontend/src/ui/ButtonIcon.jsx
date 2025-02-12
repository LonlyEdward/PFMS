import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    /* background-color: var(--color-grey-1); */
    color: var(--secondary-color-20);
    transform: scale(1.1);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-6);
  }
`;

export default ButtonIcon;
