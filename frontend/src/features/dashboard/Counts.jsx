import React, { useEffect, useState } from "react";
import { fetchCounts } from "../../services/fetchCounts";
import styled from "styled-components";
import Row from "../../ui/Row";

const Sticker = styled.div`
  color: var(--color-grey-5);
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
  padding: 2rem 3.5rem;
  width: 22%;
  background-color: var(--secondary-color-40);
  border-radius: var(--border-radius-lg);
  font-size: larger;
  margin-bottom: 50px;
`;
const Span = styled.span`
  font-size: 5rem;
`;

const SRow = styled(Row)`
  gap: 4.5rem;
`

const Counts = () => {
  const [counts, setCounts] = useState({
    transactions: 0,
    reminders: 0,
    bank_accounts: 0,
    budgets: 0,
  });

  useEffect(() => {
    const getCounts = async () => {
      try {
        const data = await fetchCounts();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    getCounts();
  }, []);

  return (
    <SRow type="wrap">
      <Sticker>
        Total Transactions<Span>{counts.transactions}</Span>
      </Sticker>
      <Sticker>
        Total Reminders <Span>{counts.reminders}</Span>
      </Sticker>
      <Sticker>
        Total Accounts <Span>{counts.bank_accounts}</Span>
      </Sticker>
      <Sticker>
        Total Budgets<Span>{counts.budgets}</Span>
      </Sticker>
    </SRow>
  );
};

export default Counts;
