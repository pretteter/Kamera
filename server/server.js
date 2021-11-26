const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.get('/cam', (req, res) => {
    res.send('<h1>Hello Cam</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // console.log(socket)
    console.log(socket.handshake.headers.origin)

    socket.on("chat message", (data) => {
        // console.log("message: ")
        // console.table(data)
    })

    socket.emit("toClient","testClient")
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});