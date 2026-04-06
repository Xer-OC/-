import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.get('/health', (_, res) => {
  res.json({ ok: true, service: 'socialfarm-realtime' });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
  });

  socket.on('chat-message', (payload: { roomId: string; user: string; message: string }) => {
    io.to(payload.roomId).emit('chat-message', {
      ...payload,
      sentAt: new Date().toISOString()
    });
  });
});

const PORT = Number(process.env.PORT ?? 4001);
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Realtime service listening on :${PORT}`);
});
