import React from "react";
import Row from "../ui/Row";
import styled from "styled-components";
import Button from "../ui/Button";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import ReportCard from "../ui/ReportCard";
import { useNavigate } from "react-router-dom";

const ReportRow = styled(Row)`
  gap: 5rem;
`;
const Span = styled.span`
  font-size: 2rem;
`;

const ReportButton = styled(Button)`
  color: var(--color-grey-7);
  border-radius: 0px;
  width: 100%;
  font-size: 1.5rem;
  background-color: var(--color-grey-2);
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);

  &:hover {
    background-color: var(--color-grey-4);
  }
`;

function Reports() {
  const navigate = useNavigate();
  return (
    <>
      {/* <Chart /> */}

      <ReportRow type="wrap">
        <ReportCard>
          <BsCalendar2CheckFill />
          <Span>Budgets</Span>
          <ReportButton onClick={() => navigate("/budgetsreport")}>
            Generate Report
          </ReportButton>
        </ReportCard>
        <ReportCard>
          <FaClipboardList />
          <Span>Transactions</Span>
          <ReportButton onClick={() => navigate("/transactionsreport")}>
            Generate Report
          </ReportButton>
        </ReportCard>
      </ReportRow>
    </>
  );
}

export default Reports;
