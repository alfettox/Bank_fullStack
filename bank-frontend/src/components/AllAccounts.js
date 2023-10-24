import React, { useState, useEffect } from 'react';

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to your Go server
    fetch('http://localhost:8081/accounts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAccounts(data); // Set the retrieved data in the 'accounts' state
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Accounts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              Account Number: {account.accountNumber}, Balance: ${account.balance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccountList;
