import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Chart = () => {
  const [data, setData] = useState([]);

  const getTransactions = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getTransactions();
  }, []);;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <BarChart width={900} height={500} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Chart;
