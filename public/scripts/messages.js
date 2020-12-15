//
// COMP 484 | Spring 2020
// messages.js | Brandon Dahl, Priya Singh
//
// Formats the user inputted messages for the chat rooms
//======================================================================

// Format the message
function formatMessage(username, text) {
    return {
        username,
        text,
        time: new Date()
    }
}

module.exports = formatMessage;
