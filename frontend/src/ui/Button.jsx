import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-grey-3); // text color: ;
    background-color: var(--secondary-color-20); // bg color

    &:hover {
      background-color: var(--secondary-color-40); // bg color on hover
    }
  `,
  secondary: css`
    color: var(--color-grey-4);
    background: var(--color-grey-6);
    border: 1px solid var(--color-grey-7);

    &:hover {
      background-color: var(--color-grey-7);
    }
  `,
  danger: css`
    color: var(--color-grey-1);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
