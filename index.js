// server.js or index.js
const express = require('express');
const { createServer } = require('http');
const next = require('next');
const { initWebSocketServer } = require('./websocket-server'); // Ensure the correct path

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  // Initialize the WebSocket server with the HTTP server
  initWebSocketServer(httpServer);

  // Handle all Next.js requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server on port 3000 (or another port if required)
  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
