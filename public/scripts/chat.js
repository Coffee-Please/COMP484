//
// COMP 484 | Spring 2020
// chat.js | Brandon Dahl, Priya Singh
//
// Contains the event handlers for the chat rooms
//======================================================================


// VARIABLES
const socket = io(); // Use socket functions
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true}); // Get username and room from URL, ignore special characters


// Join Chat room
socket.emit('joinRoom', {username, room});


// Get room and users
socket.on('roomUsers', ({room, users}) => {
	// Get room name to display
	outputRoomName(room);

	// Get users to display
	outputUsers(users);
}); // end socket


// Message from server
socket.on('message', message => {
	// Convert UTC time to client time
	message.time = new Date(message.time).toLocaleTimeString([], {timeStyle: "short"});

	// Get message to display
	outputMessage(message);

	// Scroll down when a message is sent by user
	 document.querySelector('.chat-messages').scrollTop =  document.querySelector('.chat-messages').scrollHeight;
}); // end socket


// Message submit handler, Listens when the user clicks submit
document.getElementById('chat-form').addEventListener('submit', (element) => {
	// prevent submission to file (default behavior)
	element.preventDefault();

	// Store inputted message
	const msg = element.target.elements.msg.value;

	// Emit message to the server
	socket.emit('chatMessage', msg);

	// Clear input box after message is sent
	element.target.elements.msg.value = '';

	// Focus cursor in input box
	element.target.elements.msg.focus();
}); // end addEventListener


// Output message to DOM
function outputMessage(message) {
	// Create div in HTML to hold message
	const div = document.createElement('div');

	// Add div to 'message' class
	div.classList.add('message');

	// Inject message into new div with HTML
	div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p><p class="text">${message.text}</p>`;

	// Add message to the end of the meaasge list
	document.querySelector('.chat-messages').appendChild(div);
} // end outputMessages


// Adds room name to chat room
function outputRoomName(room){
	// Add the Room name to the chat box
	 document.getElementById('room-name').innerHTML = room;
} // end outputRoomName


//Add users to Users List in sidebar
function outputUsers(users) {
	// Add users to the Users list
	 document.getElementById('users').innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
} // end outputUsers


// Redirect user to main page after they leave the room
function leaveRoom() {
	// Redirect to the homepage
	location.href = 'index.html';
} // end leaveRoom
