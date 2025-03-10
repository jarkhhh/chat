let sendButton = document.getElementById('sendButton');
let messageInput = document.getElementById('messageInput');
let messageList = document.getElementById('messageList');
let username ="";
const socket = new WebSocket('https://chat-f3n2.onrender.com');
username=localStorage.getItem('username');
if(username === null){
    username = prompt('Enter your username');
    localStorage.setItem('username', username);
}
console.log(username);
socket.onopen = function() {
    console.log('Соединение установлено');
    
};
socket.onmessage = function(event) { 
    
    let parsed = JSON.parse(event.data);
    messageList.innerHTML = '';
    
    parsed.forEach(message => {
        let parseMessage = JSON.parse(message);
        
        let user = parseMessage.username;
        let msg = parseMessage.message;
        
        const myMessage = `<div class="msg">
                <h1>${user}</h1>
                <p>${msg}</p>
            </div>`;
            
        const otherMessage = `<div class="othermsg">
                <h1>${user}</h1>
                <p>${msg}</p>
            </div>`;
        if (user === username) {
            messageList.innerHTML += myMessage;
        } else {
            messageList.innerHTML += otherMessage;
        }
    });
    messageList.scrollTop = messageList.scrollHeight;
}
setInterval(() => {
    sendCommand('get');
}, 100);
sendButton.onclick = function() {
    sendCommand('send', JSON.stringify({username: username, message: messageInput.value}));
    messageInput.value = '';
}
function sendCommand(command, data) {
    socket.send(JSON.stringify({command, data}));
}
  
