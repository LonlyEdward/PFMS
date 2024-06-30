// import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Counts from "../features/dashboard/Counts";
// import TransactionsLineChart from "../features/transactions/TransactionsLineChart";
import RecentTransactionsTable from "../features/transactions/RecentTransactionsTable";

function Dashboard() {
  return (
    <>
      <Row type="horizontal"></Row>

      <Counts />

      {/* <TransactionsLineChart /> */}
      <RecentTransactionsTable />
    </>
  );
}

export default Dashboard;
