const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const {
    Server
} = require("socket.io");
const ioCam = new Server(httpServer, {
    path: "/camData/"
});
const ioQuiz = new Server(httpServer, {
    path: "/quizData/"
});



app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

ioQuiz.on('connection', (socket) => {
    console.log('Quiz connected');
    ioQuiz.quizSocket=socket;
    console.log(ioQuiz.quizSocket);
    socket.on("quizData", (data) => {
        console.log("quizData " + data)
        // console.table(data)
    })

    // socket.emit("toClient", "testClient")
});

ioCam.on('connection', (socket) => {
    console.log('Cam connected');
    ioCam.camSocket=socket;
    socket.on("camData", (data) => {
        console.log("camData ")
        // console.table(data)
    })

    // socket.emit("toClient", "testClient")
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});