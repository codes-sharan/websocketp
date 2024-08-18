const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve HTTP traffic
app.get('/', (req, res) => {
  res.send('Hello, this is an HTTP server');
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Start the server
server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080 and ws://localhost:8080');
});
