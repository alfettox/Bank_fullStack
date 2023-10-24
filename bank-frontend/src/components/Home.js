import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Add links to other pages */}
      <nav>
        <ul>
          <li>
            <Link to="/all-accounts">All Accounts</Link>
          </li>
          <li>
            <Link to="/user-operations">User Operations</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
