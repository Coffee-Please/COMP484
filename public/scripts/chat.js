//
// COMP 484 | Spring 2020
// chat.js | Brandon Dahl, Priya Singh
//
// Contains the event handlers for the chat rooms
//======================================================================


// VARIABLES
const SOCKET = io(); // Use socket functions
const userInfo = Qs.parse(location.search, {ignoreQueryPrefix: true}); // Get username and room from URL, ignore special characters


// The user joins the chatroom
SOCKET.emit('joinRoom', {username : userInfo.username, room : userInfo.room});


// Message submit handler, Listens when the user clicks submit
document.getElementById('chat-form').addEventListener('submit', (event) => {
	'use strict';

	// prevent submission to file (default behavior)
	event.preventDefault();

	// Get the user input
	var userInput = event.target.elements.msg;

	// Store inputted message
	const msg = userInput.value;

	// Send message to room
	SOCKET.emit('chatMessage', msg);

	// Clear input box after message is sent
	userInput.value = '';

	// Activate cursor in input box
	userInput.focus();
}); // end addEventListener


// Message from server
SOCKET.on('message', message => {
	const div = document.createElement('div'); // Create div in HTML to hold the user inputted message
	const messageList = document.querySelector('.chat-messages'); // Get the list of messages in the chatroom

	// Convert UTC time to client time
	message.time = new Date(message.time).toLocaleTimeString([], {timeStyle: "short"});

	// Format message in HTML
	var messageFormat = `<p class="meta">${message.username}<span> ${message.time}</span></p><p class="text">${message.text}</p>`;

	// Add div to 'message' class
	div.classList.add('message');

	// Inject message into new div
	div.innerHTML = messageFormat;

	// Add message to the end of the message list
	messageList.appendChild(div);

	// Scroll down when a message is sent by user
	messageList.scrollTop =  messageList.scrollHeight;
}); // end socket


// When we need to display the users in the room
SOCKET.on('roomUsers', ({room, users}) => {
	// Add the Room name to the chat box
	document.getElementById('room-name').innerHTML = room;

	// Create a holder for the new user list
	var userList = [];

	// Go through the users and add them to the userList
	users.forEach(function (user) {

		// Format the new user
		var newItem = `<li>${user.username}</li>`;

		// Add to the list
		return userList.push(newItem);
	}); // end users

	// Display userList in sidebar
	 document.getElementById('users').innerHTML = userList.join('');
}); // end socket


// Redirect user to main page after they leave the room
function leaveRoom() {
	'use strict';

	// Redirect to the homepage
	location.href = 'index.html';
} // end leaveRoom
