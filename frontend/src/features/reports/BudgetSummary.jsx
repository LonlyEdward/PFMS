import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "../../ui/Select";
import Heading from "../../ui/Heading";
import styled from "styled-components";

const SHeading = styled(Heading)`
  text-align: center;
`;

const P = styled.p`
    font-size: 1.7rem;
`

function BudgetSummary() {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState("");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    // Fetch all budgets for the dropdown
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/budgets", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setBudgets(response.data);
      } catch (error) {
        console.error("There was an error fetching the budgets!", error);
        toast.error("Failed to fetch budgets");
      }
    };

    fetchBudgets();
  }, []);

  const handleSelectChange = async (e) => {
    const budgetId = e.target.value;
    setSelectedBudgetId(budgetId);

    if (budgetId) {
      // Fetch budget summary information
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/budgets/${budgetId}/summary/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setSummary(response.data);
      } catch (error) {
        console.error("There was an error fetching the budget summary!", error);
        toast.error("Failed to fetch budget summary");
      }
    }
  };

  return (
    <>
      <SHeading>Budgets Summary</SHeading>
      <Select value={selectedBudgetId} onChange={handleSelectChange}>
        <option value="">Select a Budget</option>
        {budgets.map((budget) => (
          <option key={budget.id} value={budget.id}>
            {budget.name}
          </option>
        ))}
      </Select>
      <br />
      <br />
      {summary && (
        <div>
          <Heading><strong>Budget Name:</strong> {summary.name}</Heading>
          <P><strong>Details:</strong> {summary.description}</P>
          <P><strong>Budget Amount:</strong> {summary.amount}</P>
          <P><strong>Total Entries Amount:</strong> {summary.total_entries_amount}</P>
          {summary.is_exceeded ? (
            <P style={{ color: "red" }}><strong>Status: </strong> You have exceeded the budget by {summary.exceeded_amount}
            </P>
          ) : (
            <P style={{ color: "green" }}><strong>Status: </strong>You are within the budget</P>
          )}
        </div>
      )}
    </>
  );
}

export default BudgetSummary;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// function BudgetSummary() {
//   const [budgets, setBudgets] = useState([]);
//   const [selectedBudgetId, setSelectedBudgetId] = useState('');
//   const [summary, setSummary] = useState(null);

//   useEffect(() => {
//     const fetchBudgets = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/budgets", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         });
//         setBudgets(response.data);
//       } catch (error) {
//         console.error("There was an error fetching the budgets!", error);
//         toast.error("Failed to fetch budgets");
//       }
//     };

//     fetchBudgets();
//   }, []);

//   const handleSelectChange = async (e) => {
//     const budgetId = e.target.value;
//     setSelectedBudgetId(budgetId);

//     if (budgetId) {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/budgets/${budgetId}/summary/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         });
//         setSummary(response.data);
//       } catch (error) {
//         console.error("There was an error fetching the budget summary!", error);
//         toast.error("Failed to fetch budget summary");
//       }
//     }
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div>
//       <h1>Budget Summary</h1>
//       <select value={selectedBudgetId} onChange={handleSelectChange}>
//         <option value="">Select a Budget</option>
//         {budgets.map((budget) => (
//           <option key={budget.id} value={budget.id}>
//             {budget.name}
//           </option>
//         ))}
//       </select>

//       {summary && (
//         <div>
//           <h2>{summary.name}</h2>
//           <p>{summary.description}</p>
//           <p>Budget Amount: {summary.amount}</p>
//           <p>Total Entries Amount: {summary.total_entries_amount}</p>
//           {summary.is_exceeded ? (
//             <p style={{ color: 'red' }}>
//               You have exceeded the budget by {summary.exceeded_amount}
//             </p>
//           ) : (
//             <p>You are within the budget</p>
//           )}
