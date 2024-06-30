// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import Select from "../../ui/Select";
// import Heading from "../../ui/Heading";
// import styled from "styled-components";

// const SHeading = styled(Heading)`
//   text-align: center;
// `;

// const P = styled.p`
//   font-size: 1.7rem;
// `;

// function BudgetSummary() {
//   const [budgets, setBudgets] = useState([]);
//   const [selectedBudgetId, setSelectedBudgetId] = useState("");
//   const [summary, setSummary] = useState(null);

//   useEffect(() => {
//     // Fetch all budgets for the dropdown
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
//       // Fetch budget summary information
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/api/budgets/${budgetId}/summary/`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );
//         setSummary(response.data);
//       } catch (error) {
//         console.error("There was an error fetching the budget summary!", error);
//         toast.error("Failed to fetch budget summary");
//       }
//     }
//   };

//   return (
//     <>
//       <SHeading>Budgets Summary</SHeading>
//       <Select value={selectedBudgetId} onChange={handleSelectChange}>
//         <option value="">Select a Budget</option>
//         {budgets.map((budget) => (
//           <option key={budget.id} value={budget.id}>
//             {budget.name}
//           </option>
//         ))}
//       </Select>
//       <br />
//       <br />
//       {summary && (
//         <div>
//           <Heading>
//             <strong>Budget Name:</strong> {summary.name}
//           </Heading>
//           <P>
//             <strong>Details:</strong> {summary.description}
//           </P>
//           <P>
//             <strong>Budget Amount:</strong> {summary.amount}
//           </P>
//           <P>
//             <strong>Total Entries Amount:</strong>{" "}
//             {summary.total_entries_amount}
//           </P>
//           {summary.is_exceeded ? (
//             <P style={{ color: "red" }}>
//               <strong>Status: </strong> You have exceeded the budget by{" "}
//               {summary.exceeded_amount}
//             </P>
//           ) : (
//             <P style={{ color: "green" }}>
//               <strong>Status: </strong>You are within the budget
//             </P>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default BudgetSummary;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import Select from "../../ui/Select";
// import Heading from "../../ui/Heading";
// import styled from "styled-components";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const SHeading = styled(Heading)`
//   text-align: center;
// `;

// const P = styled.p`
//   font-size: 1.7rem;
// `;

// function BudgetSummary() {
//   const [budgets, setBudgets] = useState([]);
//   const [selectedBudgetId, setSelectedBudgetId] = useState("");
//   const [summary, setSummary] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Fetch all budgets for the dropdown
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
//     setSummary(null);
//     setIsLoading(true);

//     if (budgetId) {
//       // Fetch budget summary information
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/api/budgets/${budgetId}/summary/`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );
//         console.log("API response:", response.data);
//         setSummary(response.data);
//       } catch (error) {
//         console.error("There was an error fetching the budget summary!", error);
//         toast.error("Failed to fetch budget summary");
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   return (
//     <>
//       <SHeading>Budgets Summary</SHeading>
//       <Select value={selectedBudgetId} onChange={handleSelectChange}>
//         <option value="">Select a Budget</option>
//         {budgets.map((budget) => (
//           <option key={budget.id} value={budget.id}>
//             {budget.name}
//           </option>
//         ))}
//       </Select>
//       <br />
//       <br />
//       {isLoading && <p>Loading...</p>}
//       {summary && (
//         <div>
//           <Heading>
//             <strong>Budget Name:</strong> {summary.name}
//           </Heading>
//           <P>
//             <strong>Details:</strong> {summary.description}
//           </P>
//           <P>
//             <strong>Budget Amount:</strong> {summary.amount}
//           </P>
//           <P>
//             <strong>Total Entries Amount:</strong>{" "}
//             {summary.total_entries_amount}
//           </P>
//           {summary.is_exceeded ? (
//             <P style={{ color: "red" }}>
//               <strong>Status: </strong> You have exceeded the budget by{" "}
//               {summary.exceeded_amount}
//             </P>
//           ) : (
//             <P style={{ color: "green" }}>
//               <strong>Status: </strong>You are within the budget
//             </P>
//           )}

//           {summary.entries && summary.entries.length > 0 ? (
//             <PieChart width={400} height={400}>
//               <Pie
//                 data={summary.entries}
//                 dataKey="amount"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={150}
//                 fill="#8884d8"
//               >
//                 {summary.entries.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           ) : (
//             <P>No entries available for this budget.</P>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default BudgetSummary;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import Select from "../../ui/Select";
// import Heading from "../../ui/Heading";
// import styled from "styled-components";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const SHeading = styled(Heading)`
//   text-align: center;
// `;

// const P = styled.p`
//   font-size: 1.7rem;
// `;

// function BudgetSummary() {
//   const [budgets, setBudgets] = useState([]);
//   const [selectedBudgetId, setSelectedBudgetId] = useState("");
//   const [summary, setSummary] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Fetch all budgets for the dropdown
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
//     setSummary(null);
//     setIsLoading(true);

//     if (budgetId) {
//       // Fetch budget summary information
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/api/budgets/${budgetId}/summary/`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );
//         console.log("API response:", response.data);

//         // Convert amount from string to number
//         const updatedSummary = {
//           ...response.data,
//           entries: response.data.entries.map((entry) => ({
//             ...entry,
//             amount: Number(entry.amount),
//           })),
//         };

//         setSummary(updatedSummary);
//       } catch (error) {
//         console.error("There was an error fetching the budget summary!", error);
//         toast.error("Failed to fetch budget summary");
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   return (
//     <>
//       <SHeading>Budgets Summary</SHeading>
//       <Select value={selectedBudgetId} onChange={handleSelectChange}>
//         <option value="">Select a Budget</option>
//         {budgets.map((budget) => (
//           <option key={budget.id} value={budget.id}>
//             {budget.name}
//           </option>
//         ))}
//       </Select>
//       <br />
//       <br />
//       {isLoading && <p>Loading...</p>}
//       {summary && (
//         <div>
//           <Heading>
//             <strong>Budget Name:</strong> {summary.name}
//           </Heading>
//           <P>
//             <strong>Details:</strong> {summary.description}
//           </P>
//           <P>
//             <strong>Budget Amount:</strong> {summary.amount}
//           </P>
//           <P>
//             <strong>Total Entries Amount:</strong>{" "}
//             {summary.total_entries_amount}
//           </P>
//           {summary.is_exceeded ? (
//             <P style={{ color: "red" }}>
//               <strong>Status: </strong> You have exceeded the budget by{" "}
//               {summary.exceeded_amount}
//             </P>
//           ) : (
//             <P style={{ color: "green" }}>
//               <strong>Status: </strong>You are within the budget
//             </P>
//           )}

//           {summary.entries && summary.entries.length > 0 ? (
//             <PieChart width={400} height={400}>
//               <Pie
//                 data={summary.entries}
//                 dataKey="amount"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={150}
//                 fill="#8884d8"
//                 label
//               >
//                 {summary.entries.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           ) : (
//             <P>No entries available for this budget.</P>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default BudgetSummary;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "../../ui/Select";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SHeading = styled(Heading)`
  text-align: center;
`;

const P = styled.p`
  font-size: 1.7rem;
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-right: 20px;
`;

function BudgetSummary() {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState("");
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setSummary(null);
    setIsLoading(true);

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
        console.log("API response:", response.data);

        // Convert amount from string to number
        const updatedSummary = {
          ...response.data,
          entries: response.data.entries.map((entry) => ({
            ...entry,
            amount: Number(entry.amount),
          })),
        };

        setSummary(updatedSummary);
      } catch (error) {
        console.error("There was an error fetching the budget summary!", error);
        toast.error("Failed to fetch budget summary");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
      {isLoading && <p>Loading...</p>}
      {summary && (
        <SummaryContainer>
          <InfoContainer>
            <Heading>
              <strong>Budget Name:</strong> {summary.name}
            </Heading>
            <P>
              <strong>Details:</strong> {summary.description}
            </P>
            <P>
              <strong>Budget Amount:</strong> {summary.amount}
            </P>
            <P>
              <strong>Total Entries Amount:</strong>{" "}
              {summary.total_entries_amount}
            </P>
            {summary.is_exceeded ? (
              <P style={{ color: "red" }}>
                <strong>Status: </strong> You have exceeded the budget by{" "}
                {summary.exceeded_amount}
              </P>
            ) : (
              <P style={{ color: "green" }}>
                <strong>Status: </strong>You are within the budget
              </P>
            )}
          </InfoContainer>
          <div>
            {summary.entries && summary.entries.length > 0 ? (
              <PieChart width={700} height={400} margin={{ top: 20 }}>
                <Pie 
                  data={summary.entries}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {summary.entries.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <P>No entries available for this budget.</P>
            )}
          </div>
        </SummaryContainer>
      )}
    </>
  );
}

export default BudgetSummary;
