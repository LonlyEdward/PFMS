import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function BudgetsReport() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading>Budgets Report</Heading>
        <Button onClick={() => navigate("/reports")}>Go Back</Button>
      </Row>
    </>
  );
}

export default BudgetsReport;
