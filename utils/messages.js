function formatMessage(username, text) {
    return {
        username,
        text,
        time: new Date().toLocaleTimeString([], {timeStyle: 'short'})
    }
}

module.exports = formatMessage;
