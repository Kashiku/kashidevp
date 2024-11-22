import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [userId, setUserId] = useState(1);

  return (
    <div>
      <h1>Transaction Management</h1>
      <TransactionForm />
      <TransactionList userId={userId} />
    </div>
  );
}

export default App;
