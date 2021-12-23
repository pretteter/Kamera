var socket = io("http://localhost:3000/", {
  transports: ["websocket"],
  path: "/camData/"
});
console.log(socket);
socket.on("connect_error", (data) => {
  console.log("not_connected")
})

socket.on("connect", (data) => {
  console.log("connected")
})

// socket.on("toClient", (data) => {
//   console.log(data)
// })

function sendDataToQuiz(data) {
  // console.table(data);
  socket.emit('camQuiz', data);
}
function sendDataToPlate(data) {
  // console.table(data);
  socket.emit('camPlate', data);
}