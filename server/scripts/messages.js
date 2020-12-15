//
// COMP 484 | Spring 2020
// messages.js | Brandon Dahl, Priya Singh
//
// Creates an object for the user inputted messages for the chat rooms
//======================================================================


// Format the message
function formatMessage(username, text) {
	'use strict';

	// return the message object
	return {
		username,
		text,
		time: new Date()
	}
} // end formatMessage

// Export function to other js files
module.exports = formatMessage;
