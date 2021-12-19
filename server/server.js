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
const ioPlate = new Server(httpServer, {
    path: "/quizPlate/"
});



app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

ioQuiz.on('connection', (socket) => {
    console.log('Quiz connected');
    ioQuiz.quizSocket = socket;
});

ioCam.on('connection', (socket) => {
    console.log('Cam connected');
    ioCam.camSocket = socket;
    socket.on("camQuiz", (data) => {
        console.log("camQuiz ")
        if (ioQuiz?.QuizSocket) {
            ioQuiz.QuizSocket.emit("cam", data)
        }
    })
    socket.on("camPlate", (data) => {
        console.log("fromCam ")
        if (ioPlate?.PlateSocket) {
            ioPlate.PlateSocket.emit("cam", data)
        }
    })
    // socket.emit("toClient", "testClient")
});

ioPlate.on('connection', (socket) => {
    console.log('Plate connected');
    ioPlate.PlateSocket = socket;
    socket.on("plateQuiz", (data) => {
        console.log("fromPlate")
        if (ioQuiz?.QuizSocket) {
            ioQuiz.QuizSocket.emit("plate", data)
        }
    })
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});