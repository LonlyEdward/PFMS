import styled from "styled-components";

const ReportCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  height: 20rem;
  justify-content: space-between;
  align-items: center;
  padding-top: 3.5rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-grey-1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  & svg {
    width: 4rem;
    height: 4rem;
    color: var(--secondary-color-40);
    transition: all 0.3s;
  }

  transition-duration: 600ms;

  &:hover {
    transform: scale(1.1);
  }
`;

export default ReportCard;
