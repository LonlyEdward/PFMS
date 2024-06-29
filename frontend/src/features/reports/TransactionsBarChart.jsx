import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const TransactionsBarChart = () => {
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({ incomes: {}, expenses: {} });

  const fetchTransactions = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    const transactions = response.data;
    const monthsData = Array(12)
      .fill(null)
      .map((_, index) => ({
        month: new Date(0, index).toLocaleString("default", { month: "long" }),
        incomes: 0,
        expenses: 0,
      }));

    const totalsData = { incomes: {}, expenses: {} };

    transactions.forEach((transaction) => {
      const monthIndex = new Date(transaction.date).getMonth();
      if (transaction.transactiontype_name === "Income") {
        monthsData[monthIndex].incomes += parseFloat(transaction.amount);
        totalsData.incomes[monthIndex] =
          (totalsData.incomes[monthIndex] || 0) +
          parseFloat(transaction.amount);
      } else {
        monthsData[monthIndex].expenses += parseFloat(transaction.amount);
        totalsData.expenses[monthIndex] =
          (totalsData.expenses[monthIndex] || 0) +
          parseFloat(transaction.amount);
      }
    });

    setData(monthsData);
    setTotals(totalsData);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h3>Monthly Income and Expenses</h3>
      <ResponsiveContainer width="100%" height={400} margin={{ left: 20 }}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis width={80} />
          <Tooltip />
          <Legend />
          <Bar dataKey="incomes" fill="#82ca9d" />
          <Bar dataKey="expenses" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div>
        <h4>Total Amounts for Each Month</h4>
        <Ul>
          {Object.keys(totals.incomes).map((monthIndex) => (
            <li key={monthIndex}>
              <strong>
                {new Date(0, monthIndex).toLocaleString("default", {
                  month: "long",
                })}
              </strong>
              <br /> Incomes: {totals.incomes[monthIndex].toFixed(2)}
              <br /> Expenses:{" "}
              {totals.expenses[monthIndex]?.toFixed(2) || "0.00"}
            </li>
          ))}
        </Ul>
      </div>
    </div>
  );
};

export default TransactionsBarChart;
