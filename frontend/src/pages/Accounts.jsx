import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AccountsOperations from "../features/accounts/AccountsOperations";
import Card from "../features/accounts/Card";

const accounts = [
  { name: 'Savings Account', balance: 1500.00, dateCreated: '2022-01-10', type: 'Savings' },
  { name: 'Checking Account', balance: 2300.75, dateCreated: '2021-05-15', type: 'Checking' },
  { name: 'Investment Account', balance: 12000.00, dateCreated: '2023-03-22', type: 'Investment' },
  { name: 'Investment Account', balance: 12000.00, dateCreated: '2023-03-22', type: 'Investment' },
  { name: 'Investment Account', balance: 12000.00, dateCreated: '2023-03-22', type: 'Investment' },
];

const handleEdit = (account) => {
  alert(`Editing: ${account.name}`);
};

const handleDelete = (account) => {
  alert(`Deleting: ${account.name}`);

}

function Accounts() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Accounts</Heading>
      <AccountsOperations />
    </Row>

    <Row type ="wrap">
      {accounts.map((account, index) => (
        <Card key={index} account={account} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </Row>
    </>
  );
}

export default Accounts;
