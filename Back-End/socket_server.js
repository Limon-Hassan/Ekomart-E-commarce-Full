const { Server } = require('socket.io');
let io;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:5173',
        'https://ekomart-e-commarce.withlimon.workers.dev',
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
