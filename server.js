'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const ws = new SocketServer({ server });

ws.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.send('Test message from server.');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  ws.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 10000);

ws.on('open', function open() {
  ws.send('Test message from server');
});

ws.on('message', function incoming(data) {
  console.log(data);
});