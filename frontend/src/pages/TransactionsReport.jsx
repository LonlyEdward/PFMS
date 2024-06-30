import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import TransactionsBarChart from "../features/reports/TransactionsBarChart";

function TransactionsReport() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions Reports</Heading>
        <Button onClick={() => navigate("/reports")}>Go back</Button>
      </Row>
      <TransactionsBarChart />
    </>
  );
}

export default TransactionsReport;
