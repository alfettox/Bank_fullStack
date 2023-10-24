# Bank Interface Application with MongoDB
This project is a simple bank interface application built with a React frontend and a Go backend, and it uses a MongoDB database to store account information. The README will guide you through setting up and running the application and the MongoDB database.

## Prerequisites
Before you begin, make sure you have the following software installed on your system:

## Node.js - JavaScript runtime for running the React frontend.
Go - Programming language for the backend server.
MongoDB - NoSQL database for storing account data.
Setting up the MongoDB Database
Start a local MongoDB instance on your machine. You can do this using the mongod command in your terminal.

Connect to the MongoDB shell by running mongo in your terminal.

Run the following script to create a new database called bank-db, a user with read and write permissions, and insert 60 accounts with random names, addresses, postal codes, and balances into the database:

javascript
Copy code
db = new Mongo().getDB("bank-db");

// Create a user with read and write permissions for the "bank-db" database
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "bank-db" }]
});

// Insert 60 accounts with random names, addresses, postal codes, and balances
// ...

Verify that the accounts have been added to the bank-db database by running queries in the MongoDB shell.
Setting up the Go Backend
Clone this repository or copy the Go backend (main.go) into your Go workspace.

Install the necessary Go packages by running the following commands in your terminal:


go get -u github.com/gorilla/mux
go get -u github.com/rs/cors
Start the Go backend by running the following command:

go run main.go
The Go backend will run on http://localhost:8080.

Setting up the React Frontend
Clone this repository or copy the React frontend into a separate directory.

Install the required dependencies by running the following command in the React frontend directory:


npm install
Start the React frontend by running the following command:

npm start
The React frontend will run on http://localhost:3000.

### Using the Bank Interface
Once the MongoDB database, Go backend, and React frontend are running, you can access the bank interface by visiting http://localhost:3000 in your web browser. The interface allows you to view a list of accounts, perform withdrawals and deposits, and see account details.

## Modifying the Data
To add, update, or delete accounts in the MongoDB database, you can use the MongoDB shell or a graphical client for MongoDB, such as MongoDB Compass. Remember to restart the Go backend after making any changes to the database.