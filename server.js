//
// COMP 484 | Spring 2020
// server.js | Brandon Dahl, Priya Singh
//
// Sets app and socketio function handlers and vars
// for the chat room
//======================================================================


// REQUIRED PACKAGES, FILES AND CONST VARS
const FORMAT = require('./public/scripts/messages'); // Formatting for messages from messages.js
const USERS = require('./public/scripts/users'); // Get function from users.js
const PATH = require('path'); // NodeJS - Handle and transforms filepaths
const HTTP = require('http'); // NodeJS - Allow transfer of data over HTTP
const EXPRESS = require('express'); // use express framework
const SOCKETIO = require('socket.io'); // use socket.io framework
const APP = EXPRESS(); // create an express app
const SERVER = HTTP.createServer(APP); // create the server to use for socket.io
const IO = SOCKETIO(SERVER); // use socket.io with server
const PORT = process.env.PORT || 3000; // Run server on available port, otherwise localhost fallback
const ENV = process.env.NODE_ENV; // Set available port


// Create the server running on the available port
SERVER.listen(PORT);

// Access heroku production environment or localhost
if (ENV === 'production' || PORT === 3000) {
	// Set code folder
	APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));
} // end if


// When client connects, run socket
IO.on('connection', socket => {
	// When a message is sent by the user
	socket.on('chatMessage', msg => {
		const USER = USERS.getCurrentUser(socket.id); // Get the current user

		// Emit message to the room the user is in
		IO.to(USER.room).emit('message', FORMAT(USER.username, msg));
	}); // end socket


	// When the user leaves the chatroom
	socket.on('disconnect', () => {
		const USER = USERS.userLeave(socket.id); // Get the current user leaving the room

		// if the user who left the chat is the current user
		if(USER) {
			// emit message to their room
			IO.to(USER.room).emit('message', FORMAT(`${USER.room} Bot`, `${USER.username} has left the chat.`));

			// Update user list and room info for the remaining users in the room
			IO.to(USER.room).emit('roomUsers', {room: USER.room, users: USERS.getRoomUsers(USER.room)});
		} // end if
	}); // end socket


	// When the user joins the room
	socket.on('joinRoom', ({username, room}) => {
        	const USER = USERS.addUser(socket.id, username, room); // Set the user who just joined and the room they joined

		// Send the user to the room
        	socket.join(USER.room);

        	// When the user enters the room, have bot say welcome to the joining user
        	socket.emit('message', FORMAT(`${USER.room} Bot`, `Welcome to ${USER.room}.`));

       		// When a user joins the room, announce it to the other users in the room
        	socket.broadcast.to(USER.room).emit('message', FORMAT(`${USER.room} Bot`, `${USER.username} has joined the chat.`));

        	// Update the user list and room info for the remaining users in the room
        	IO.to(USER.room).emit('roomUsers', {room: USER.room, users: USERS.getRoomUsers(USER.room)});
	}); // end socket
}); // end io
