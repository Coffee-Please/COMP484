//
// COMP 484 | Spring 2020
// chat.js | Brandon Dahl, Priya Singh
//
// Contains the event handlers for the chat rooms
//======================================================================


// VARIABLES
const SOCKET = io(); // Use socket functions
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true}); // Get username and room from URL, ignore special characters


// Join Chat room
SOCKET.emit('joinRoom', {username, room});


// Get room and users
SOCKET.on('roomUsers', ({room, users}) => {
	// Add the Room name to the chat box
	 document.getElementById('room-name').innerHTML = room;

	// Add users to the Users list
	 document.getElementById('users').innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}); // end socket


// Message from server
SOCKET.on('message', message => {
	// Convert UTC time to client time
	message.time = new Date(message.time).toLocaleTimeString([], {timeStyle: "short"});

	// Create div in HTML to hold message
	const div = document.createElement('div');

	// Add div to 'message' class
	div.classList.add('message');

	// Inject message into new div with HTML
	div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p><p class="text">${message.text}</p>`;

	// Add message to the end of the meaasge list
	document.querySelector('.chat-messages').appendChild(div);

	// Scroll down when a message is sent by user
	 document.querySelector('.chat-messages').scrollTop =  document.querySelector('.chat-messages').scrollHeight;
}); // end socket


// Message submit handler, Listens when the user clicks submit
document.getElementById('chat-form').addEventListener('submit', (element) => {
	'use strict';

	// prevent submission to file (default behavior)
	element.preventDefault();

	// Store inputted message
	const msg = element.target.elements.msg.value;

	// Emit message to the server
	SOCKET.emit('chatMessage', msg);

	// Clear input box after message is sent
	element.target.elements.msg.value = '';

	// Focus cursor in input box
	element.target.elements.msg.focus();
}); // end addEventListener


// Redirect user to main page after they leave the room
function leaveRoom() {
	'use strict';

	// Redirect to the homepage
	location.href = 'index.html';
} // end leaveRoom
