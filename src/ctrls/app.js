import express from 'express';

import http from 'http';

import socketIO from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.get('/', (req, res) => {
  // ...
});

io.on('connection', (socket) => {
  // ...
});

server.listen(3000);
