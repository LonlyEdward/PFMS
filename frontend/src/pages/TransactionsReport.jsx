import Chart from "../features/reports/Chart";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function TransactionsReport() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading>Transactions Reports</Heading>
        <Button onClick={() => navigate("/reports")}>Go back</Button>
      </Row>
      <Chart />
    </>
  );
}

export default TransactionsReport;
