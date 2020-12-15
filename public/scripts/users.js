//
// COMP 484 | Spring 2020
// users.js | Brandon Dahl, Priya Singh
//
// Manages users in chatroom
//======================================================================

// Array to store current users in
const users = [];

// Join user to chat
function userJoin(id, username, room) {
	'use strict';

	// Create a user object
	const user = {
		id,
		username,
		room
	}; // end user

	// Add the user to the array of current users
	users.push(user);

	// Return the user
	return user;
} // end userJoin


// Get the current user
function getCurrentUser(id) {
	'use strict';

	// Find the user in the current user array using the socket id
	const found =  users.find(user => user.id === id);

	// return the user found
	return found;
} // end getCurrentUser


// User leaves the chat
function userLeave(id) {
	'use strict';

	// Find user that left using the socket id
	const found = users.findIndex(user => user.id === id);

	// If user is found, remove from array
	if(found !== -1) {
		// return the new current user array
		return users.splice(found, 1)[0];
	} // end if
} // end userLeave


// Get room users
function getRoomUsers(room) {
	'use strict';

	// Find all the user in the current room
	return users.filter(user => user.room === room);
} // end getRoomUsers


// Send functions to be used by other js files
module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers
};
