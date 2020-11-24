// REQUIRED PACKAGES/FILES
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

// VARIABLES
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Room Bot';

// When client connects, run socket.io
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // This runs when the client connects
        socket.emit('message', formatMessage(botName, 'Welcome to the Chatroom'));

        // Broadcast to all when a client connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    });

    // Listen for chat Message
    socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    // Emit message on to the room the user is in
    io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // This runs when the client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        // if the user who left the chat is the current user, emit message to their room
        if(user) {
             io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
        } // end if
    });
});

// SET PORT TO SEND DATA TO
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
