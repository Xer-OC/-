const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'socialfarm-realtime' });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('chat-message', (payload) => {
    io.to(payload.roomId).emit('chat-message', {
      ...payload,
      sentAt: new Date().toISOString()
    });
  });
});

const PORT = Number(process.env.PORT ?? 4001);
server.listen(PORT, () => {
  console.log(`Realtime service listening on :${PORT}`);
});
