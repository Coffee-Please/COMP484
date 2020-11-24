// REQUIRED PACKAGES
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// VARIABLES
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// When client connects, run socket.io
io.on('connection', socket => {
    // This runs when the client connects
    socket.emit('message', 'Welcome to the Chatroom');

    // Broadcast to all when a client connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // This runs when the client disconnects
    socket.on('disconnect', () => {
         io.emit('message', 'A user has left the chat');
});

    // Listen for chat Message
    socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
});
});

// SET PORT TO SEND DATA TO
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
