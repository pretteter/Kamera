var socket = io("http://localhost:3000/", {
  transports: ["websocket"],
  extraHeaders: {
    "my-custom-header": "1234" // WARN: this will be ignored in a browser
  }
});

socket.on("connect_error", (data) => {
  console.log("not_connected")
})

socket.on("connect", (data) => {
  console.log("connected")
})

socket.on("toClient", (data) => {
  console.log(data)
})

function sendData(data) {
  // console.table(data);
  socket.emit('chat message', data);
}