import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
  ${(props) =>
    props.type === "wrap" &&
    css`
      flex-wrap: wrap;
      gap: 1.5rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
