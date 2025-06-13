const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const cors    = require('cors');

const Routes  = require('./Router/userRouter.js');

const app     = express();
const PORT    = 3333;

// 1️⃣ Create HTTP server
const server = http.createServer(app);

// 2️⃣ Configure CORS for both Express and Socket.IO
const corsOptions = {
  origin: 'http://localhost:4200', // ✅ match Angular dev server
  credentials: true
};
app.use(cors(corsOptions));

// 3️⃣ Attach Socket.IO with CORS
const io = new Server(server, {
  cors: corsOptions
});

// 4️⃣ Expose io to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 5️⃣ JSON middleware
app.use(express.json());

// 6️⃣ Health check
app.get('/', (req, res) => {
  res.send('Welcome to the login page');
});

// 7️⃣ Auth routes
app.use('/api/auth', Routes);

// 8️⃣ Socket events
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('message', msg => {
    console.log(`Received message: ${msg}`);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// 9️⃣ Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
