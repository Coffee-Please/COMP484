// Variables
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true // Ignore special characters in beginnng of query string target
});

const socket = io();

// Join Chat room
socket.emit('joinRoom', {
    username,
    room
});

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

   // Scroll down when a message is sent by user
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit handler, Listens when the user clicks submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent submission to file (default behavior)

    // Store inputted message
    const msg = e.target.elements.msg.value;

    // Emit message to the server
    socket.emit('chatMessage', msg);

    // Clear input box after message is sent
    e.target.elements.msg.value = '';
    // Focus cursor in input box
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
