import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import BudgetSummary from "../features/reports/BudgetSummary";

function BudgetsReport() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Budgets Report</Heading>
        <Button onClick={() => navigate("/reports")}>Go Back</Button>
      </Row>

      <BudgetSummary />
    </>
  );
}

export default BudgetsReport;
