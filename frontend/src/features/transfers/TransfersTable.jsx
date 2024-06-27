import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";
import { useState, useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";

function TransfersTable() {
  const columns = [
    "Name",
    "Description",
    "Amount",
    "Date",
    "From Account",
    "To Account",
  ];

  const [transfers, setTransfers] = useState([]);

  const getTransfers = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/transfers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(response.data);
    setTransfers(response.data);
  };

  useEffect(() => {
    getTransfers();
  }, []);

  return (
    <>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {transfers.map((transfer, index) => (
            <TableRow key={index}>
              <TableCell>{transfer.name}</TableCell>
              <TableCell>{transfer.description}</TableCell>
              <TableCell>{transfer.amount}</TableCell>
              <TableCell>{transfer.date}</TableCell>
              <TableCell>{transfer.from_account.name}</TableCell>
              <TableCell>{transfer.to_account.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TransfersTable;
