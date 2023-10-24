import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserOperations from './components/UserOperations'; // Import the UserOperations component
import AccountList from './components/AllAccounts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-accounts" element={<AccountList />} /> {/* Add a route for AllAccounts */}
        <Route path="/user-operations" element={<UserOperations />} /> {/* Add a route for UserOperations */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
