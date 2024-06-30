import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableRow from "../../ui/TableRow";
import TableCell from "../../ui/TableCell";

const columns = ["Name", "Amount", "Date", "Description"];

function RecentTransactionsTable() {
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/recent-transactions/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setRecentTransactions(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
        toast.error("Failed to fetch recent transactions");
      }
    };

    fetchRecentTransactions();
  }, []);

  return (
    <div>
      <h2>Recent Transactions</h2>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {recentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RecentTransactionsTable;
