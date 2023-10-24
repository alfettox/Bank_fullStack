const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  proxy.web(req, res, { target: 'http://localhost:8080' }); // Change the target to your Go server's URL
});

server.listen(3000, () => {
  console.log('CORS proxy server is running on port 3000');
});
