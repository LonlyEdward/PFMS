import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BudgetsOperations from "../features/budgets/BudgetsOperations";

function Budgets() {
  return (
    <Row type="horizontal">
      <Heading as="h1">Budgets</Heading>
      <BudgetsOperations />
    </Row>
  );
}

export default Budgets;
