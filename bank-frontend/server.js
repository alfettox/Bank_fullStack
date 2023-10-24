const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = process.env.PORT || 8081;

const proxy = httpProxy.createProxyServer();

// Use CORS middleware to handle CORS headers
app.use(cors());

app.use((req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:8080',
  });
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
