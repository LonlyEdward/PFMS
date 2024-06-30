import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const SHeading = styled(Heading)`
  text-align: center;
`;

function TransactionsLineChart() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch all transactions
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("There was an error fetching the transactions!", error);
        toast.error("Failed to fetch transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Transform the transactions data for the line chart
  const data = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const amount = Number(transaction.amount);

    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }

    if (transaction.type === "income") {
      acc[month].income += amount;
    } else {
      acc[month].expense += amount;
    }
    console.log("Accumulated Data:", acc);
    return acc;
  }, {});

  const chartData = Object.values(data);

  return (
    <>
      <SHeading>Transactions Line Chart</SHeading>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#00C49F"
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#FF8042"
              name="Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default TransactionsLineChart;
