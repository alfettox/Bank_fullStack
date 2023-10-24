import React from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <h1>Admin Page</h1>
      <Link to="/user">Go to User Page</Link>
    </div>
  );
}

export default Admin;
