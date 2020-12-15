//
// COMP 484 | Spring 2020
// users.js | Brandon Dahl, Priya Singh
//
// Manages users in chatroom
//======================================================================


// VARIABLES
const users = []; // Array to store current users in


// Adds the user to the chatroom
function addUser(id, username, room) {
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
} // end addUser


// Retrieves the current user
function getCurrentUser(id) {
	'use strict';

	// Find the user in the current user array using the socket id
	const found =  users.find(user => user.id === id);

	// return the user found
	return found;
} // end getCurrentUser


// Removes the user from the chatroom
function userLeave(id) {
	'use strict';

	// Find user that left using the socket id
	const found = users.findIndex(user => user.id === id);

	// If user is found
	if(found !== -1) {
		// Remove the user from the array
		const removed = users.splice(found, 1)[0]; 

		// return the new current user array
		return removed;
	} // end if
} // end userLeave


// Finds all the users of a room
function getRoomUsers(room) {
	'use strict';

	// Find all the user in the current room
	const found = users.filter(user => user.room === room);

	// Return the users found
	return found;
} // end getRoomUsers


// Send functions to be used by other js files
module.exports = {
	addUser,
	getCurrentUser,
	userLeave,
	getRoomUsers
};
