import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('DEPOSIT');
  const [userId, setUserId] = useState(1);  // Default user ID 1 for testing

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        amount,
        transaction_type: transactionType,
        user_id: userId,
      });
      alert(`Transaction Created! ID: ${response.data.transaction_id}`);
      setAmount('');
      setTransactionType('DEPOSIT');
      setUserId(1);  // Reset form after submission
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
        <option value="DEPOSIT">Deposit</option>
        <option value="WITHDRAWAL">Withdrawal</option>
      </select>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button type="submit">Create Transaction</button>
    </form>
  );
};

export default TransactionForm;
