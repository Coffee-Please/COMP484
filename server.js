//
// COMP 484 | Spring 2020
// server.js | Brandon Dahl, Priya Singh
//
// Runs on start to set app and all prerequisite functions and vars
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


// Check which port the server is running on to console
SERVER.listen(PORT, () => console.log(`Port: ${PORT}`));

// Access heroku production environment or localhost
if (ENV === 'production' || PORT === 3000) {
	// Set code folder
	APP.use(EXPRESS.static(PATH.join(__dirname, 'public')));
} // end if


// When client connects, run socket
IO.on('connection', socket => {
	// When a message is sent by the user
	socket.on('chatMessage', msg => {
		// Get the current user
		const USER = USERS.getCurrentUser(socket.id);

		// Emit message to the room the user is in
		IO.to(USER.room).emit('message', FORMAT(USER.username, msg));
	}); // end socket


	// When the user leaves the chatroom
	socket.on('disconnect', () => {
		// Get the current user leaving the room
		const USER = USERS.userLeave(socket.id);

		// if the user who left the chat is the current user
		if(USER) {
			// emit message to their room
			IO.to(USER.room).emit('message', FORMAT(`${USER.room} Bot`, `${USER.username} has left the chat`));

			// Send users and room info
			IO.to(USER.room).emit('roomUsers', {room: USER.room, users: USERS.getRoomUsers(USER.room)});
		} // end if
	}); // end socket


	// When the user joins the room
	socket.on('joinRoom', ({username, room}) => {
 		// Set the user who just joined and the room they joined
        	const USER = USERS.userJoin(socket.id, username, room);

		// Send the user to the room
        	socket.join(USER.room);

        	// When the user enters the room, have bot say welcome
        	socket.emit('message', FORMAT(`${USER.room} Bot`, `Welcome to ${USER.room}`));

       		// When a user joins the room, announce it
        	socket.broadcast.to(USER.room).emit('message', FORMAT(`${USER.room} Bot`, `${USER.username} has joined the chat`));

        	// Send users and room info
        	IO.to(USER.room).emit('roomUsers', {room: USER.room, users: USERS.getRoomUsers(USER.room)});
	}); // end socket
}); // end io
