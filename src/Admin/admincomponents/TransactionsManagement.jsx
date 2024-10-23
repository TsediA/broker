import React, { useState, useEffect } from 'react';

const TransactionsManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    property: '',
    buyer: '',
    seller: '',
    status: 'pending',
    closingDate: '',
  });

  useEffect(() => {
    // Fetch the ongoing transactions from the server and update the state
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    // Implement the logic to fetch the ongoing transactions from the server
    // and update the `transactions` state
    // For now, we'll use some sample data
    const sampleTransactions = [
      {
        id: 1,
        property: '123 Main St',
        buyer: 'John Doe',
        seller: 'Jane Smith',
        status: 'in progress',
        closingDate: '2023-10-15',
      },
      {
        id: 2,
        property: '456 Oak Rd',
        buyer: 'Sarah Lee',
        seller: 'David Kim',
        status: 'pending',
        closingDate: '2023-11-01',
      },
      {
        id: 3,
        property: '789 Elm St',
        buyer: 'Lisa Park',
        seller: 'Michael Chen',
        status: 'completed',
        closingDate: '2023-09-20',
      },
    ];
    setTransactions(sampleTransactions);
  };

  const handleInputChange = (event) => {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTransaction = () => {
    // Implement the logic to create a new transaction on the server
    // and update the `transactions` state
    console.log('Creating new transaction:', newTransaction);
    setNewTransaction({
      property: '',
      buyer: '',
      seller: '',
      status: 'pending',
      closingDate: '',
    });
  };

  const handleUpdateTransaction = (transactionId, status) => {
    // Implement the logic to update the status of a transaction on the server
    // and update the `transactions` state
    console.log(`Updating transaction ${transactionId} to status: ${status}`);
  };

  return (
    <div>
      <h1>Transactions Management</h1>
      <h2>Ongoing Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Status</th>
            <th>Closing Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.property}</td>
              <td>{transaction.buyer}</td>
              <td>{transaction.seller}</td>
              <td>{transaction.status}</td>
              <td>{transaction.closingDate}</td>
              <td>
                {transaction.status === 'in progress' && (
                  <>
                    <button onClick={() => handleUpdateTransaction(transaction.id, 'completed')}>
                      Complete
                    </button>
                    <button onClick={() => handleUpdateTransaction(transaction.id, 'canceled')}>
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Transaction</h2>
      <form>
        <label>
          Property:
          <input
            type="text"
            name="property"
            value={newTransaction.property}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Buyer:
          <input
            type="text"
            name="buyer"
            value={newTransaction.buyer}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Seller:
          <input
            type="text"
            name="seller"
            value={newTransaction.seller}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Closing Date:
          <input
            type="date"
            name="closingDate"
            value={newTransaction.closingDate}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleCreateTransaction}>
          Create Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionsManagement;