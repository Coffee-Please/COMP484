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
	const user = {
		id,
		username,
		room
	}; // end user

	users.push(user);

	return user;
} // end userJoin


// Get the current user
function getCurrentUser(id) {

	return users.find(user => user.id === id);
} // end getCurrentUser


// User leaves the chat
function userLeave(id) {
	// Find user that left
	const index = users.findIndex(user => user.id === id);

	// If user is found, remove from array
	if(index !== -1) {
		// return the user
		return users.splice(index, 1)[0];
	} // end if
} // end userLeave


// Get room users
function getRoomUsers(room) {
	
	return users.filter(user => user.room === room);
} // end getRoomUsers


// Send functions to be used
module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers
};
