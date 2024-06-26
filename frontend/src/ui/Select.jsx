import styled from "styled-components";

const Select = styled.select`
  border: 1px solid var(--color-grey-4);
  /* border: 1px solid var(--color-grey-); */
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  &:focus {
    /* border: 1px solid var(--secondary-color-10); */
    outline: none;
    border: 2px solid var(--secondary-color-20);
    /* border-color: var(--secondary-color-20); */
  }
`;

export default Select;
