const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });
let messages = [];
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
        }
    });
});
console.log('WebSocket сервер запущен на ws://localhost:8080');
