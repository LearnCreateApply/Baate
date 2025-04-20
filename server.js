const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (data) => {
    io.emit('chat message', data); // Broadcast the message with username
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/home.html'));
});

app.get('/username', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/username.html'));
});

app.post('/baate', (req, res) => {
  const { login } = req.body;
  res.render('userprofile', { username: login });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
