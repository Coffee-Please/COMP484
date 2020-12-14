//
// COMP 484 | Spring 2020
// server.js | Brandon Dahl, Priya Singh
//
// Runs on start to set all prerequisites
//======================================================================

// REQUIRED PACKAGES/FILES
const path = require('path'); // NodeJS - Handle and transforms filepaths
const http = require('http');
const express = require('express'); // use express framework
const socketio = require('socket.io'); // use socket.io framework
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

// VARIABLES
const app = express(); // create an express app
const server = http.createServer(app); // create the server to use for socket.io
const io = socketio(server); // use socket.io with server
var botName; // Declare bot

// When client connects, run socket
io.on('connection', socket => {

    socket.on('joinRoom', ({username, room}) => {

        const user = userJoin(socket.id, username, room);
	botName = `${user.room} Bot`; // Set Bot to have the room name

        socket.join(user.room);

        // This runs when the client connects
        socket.emit('message', formatMessage(botName, `Welcome to ${user.room}`));

        // Broadcast to all when a client connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        }); // end io

    }); // end socket

    // Listen for chat Message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        // Emit message on to the room the user is in
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    }); // end socket

    // This runs when the client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        // if the user who left the chat is the current user, emit message to their room
        if(user) {
             io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            }); // end io
        } // end if
    }); // end socket
}); // end io

// SET PORT TO SEND DATA TO
const PORT = process.env.PORT || 3000; // Runs on available port, otherwise localhost fallback

// Log which port the serveris running on too console
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//TODO: Add MongoDB

// Access heroku production environment
if (process.env.NODE_ENV === 'production') {
    // Set code folder
    app.use(express.static(path.join(__dirname, 'public')));
}

// Access localhost environment
if (PORT === 3000) {
    // Set code folder
    app.use(express.static(path.join(__dirname, 'public')));
}


