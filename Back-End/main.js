let express = require('express');
require('dotenv').config();
var cookieParser = require('cookie-parser');
const router = require('./Router/main');
const passport = require('passport');
require('./Config/passport');
const dbConnection = require('./Config/dbconfig');
const { ErrorCheck } = require('./Halper/ErrorCheck');
let http = require('http');
let cors = require('cors');
let app = express();
const { init: initSocket } = require('./socket_server');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://evato-e-commarce-full.onrender.com/',
      'https://evato-e-commerce.onrender.com/',
    ],
    credentials: true,
  })
);

let server = http.createServer(app);
const io = initSocket(server);
io.on('connection', socket => {
  console.log('✅ User connected:', socket.id);
  socket.on('joinUser', ({ userId }) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined their private room`);
  });

  socket.on('joinProduct', ({ productId }) => {
    socket.join(productId);
    console.log(`👤 User joined product room ${productId}`);
  });

  socket.on('joinAdmin', ({ adminId }) => {
    socket.join('adminRoom');
    console.log(`👑 Admin ${adminId} joined adminRoom`);
  });
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });

  socket.on('searchProducts', async ({ query, userId }) => {
    try {
      const { searchProducts } = require('./AllController/searchController');

      const req = { query: { query, userId } };
      const res = {
        status: code => ({
          json: data => socket.emit('searchResults', data),
        }),
      };
      const next = err => {
        if (err) {
          console.error('Search error:', err);
          socket.emit('searchError', { msg: err.message });
        }
      };

      await searchProducts(req, res, next);
    } catch (error) {
      console.error('Socket search error:', error);
      socket.emit('searchError', { msg: 'Something went wrong' });
    }
  });
});

app.use('/uploads', express.static('uploads'));
app.use('/product', express.static('productPhoto'));
app.use(router);
app.use(ErrorCheck);
dbConnection();
app.get('/', (req, res) => {
  res.send('Hello World !');
});

const PORT = process.env.PORT || 44044;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = { app, server };
