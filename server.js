// REQUIRED PACKAGES/FILES
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

// VARIABLES
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Room Bot';

// When client connects, run socket.io
io.on('connection', socket => {
    // This runs when the client connects
    socket.emit('message', formatMessage(botName, 'Welcome to the Chatroom'));

    // Broadcast to all when a client connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    // This runs when the client disconnects
    socket.on('disconnect', () => {
         io.emit('message', formatMessage(botName, 'A user has left the chat'));
});

    // Listen for chat Message
    socket.on('chatMessage', (msg) => {
    io.emit('message', formatMessage('USER', msg));
});
});

// SET PORT TO SEND DATA TO
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
