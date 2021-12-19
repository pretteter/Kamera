var socket = io("http://localhost:3000/", {
  transports: ["websocket"],
  path: "/quizData/"
});
console.log(socket);
socket.on("connect_error", (data) => {
  console.log("not_connected")
})

socket.on("connect", (data) => {
  console.log("connected")
})

socket.on("camQuiz", (data) => {
  console.log(data)
})

socket.on("plateQuiz", (data) => {
  console.log(data)
})


// var serverData = (function () {
//   return {
//     sendData: function sendData(data) {
//       // console.table(data);
//       socket.emit('quizData', data);
//     }
//   }
// })(serverData || {})
