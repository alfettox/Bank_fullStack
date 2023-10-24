import React, { useState, useEffect } from 'react';

function UserOperations() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [operationType, setOperationType] = useState('deposit'); // 'deposit' or 'withdraw'

  useEffect(() => {
    // Fetch the list of accounts and store them in the 'accounts' state
    fetch('http://localhost:8081/operations')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAccounts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAccountSelection = (account) => {
    setSelectedAccount(account);
  };

  const handleOperation = () => {
    if (!selectedAccount) {
      // Handle case where no account is selected
      return;
    }

    const operationData = {
      accountNumber: selectedAccount.accountNumber,
      operation: operationType,
      amount: parseFloat(amount), // Convert amount to a number
    };

    // Make a POST request to your Go server to update the account
    fetch('http://localhost:8081/operations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle success or any other necessary logic
      })
      .catch((error) => {
        console.error('Error performing operation:', error);
      });
  };

  return (
    <div>
      <h2>User Operations</h2>
      <div>
        <label>Select Account: </label>
        <select onChange={(e) => handleAccountSelection(e.target.value)}>
          <option value="">Select an account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account}>
              {account.accountNumber}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Operation: </label>
        <select onChange={(e) => setOperationType(e.target.value)}>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
      </div>
      <button onClick={handleOperation}>Perform Operation</button>
    </div>
  );
}

export default UserOperations;
