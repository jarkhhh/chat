const WebSocket = require('ws');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true });
const messageSchema = new mongoose.Schema({ 
    user: String, 
    message: String, 
    
});
const Message = mongoose.model('Message', messageSchema);

const server = new WebSocket.Server({ port: 8080 });
let messages = [];
//read from database
messages =  Message.find()
server.on('connection', ws => {
    console.log('Новое соединение');
    ws.on('message', msg => {
        let parsed = JSON.parse(msg);
        console.log(parsed);
        if (parsed.command === 'get') {
            ws.send(JSON.stringify(messages));
        }
        if (parsed.command === 'send') {
            messages.push(parsed.data);
            let message = new Message(parsed.data);
            message.save(function (err) {
                if (err) return console.error(err);
            });
        }
    });
});
console.log('WebSocket сервер запущен на ws://localhost:8080');
