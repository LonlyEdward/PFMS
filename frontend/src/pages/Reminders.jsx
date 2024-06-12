import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

function Reminders() {
  return (
    <Row type="horizontal">
      <Heading as="h1">Reminders</Heading>
      <Button>New Reminder</Button>
    </Row>
  );
}

export default Reminders;
