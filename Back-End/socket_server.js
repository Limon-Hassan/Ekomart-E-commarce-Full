const { Server } = require('socket.io');
let io;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:5173',
        'https://evato-e-commerce-limon.onrender.com',
        'https://evato-e-commerce.onrender.com',
      ],
      methods: ['GET', 'POST'],
    },
  });
  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}

module.exports = { init, getIO };
