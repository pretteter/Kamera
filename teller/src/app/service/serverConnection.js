var socket = io("http://localhost:3000/", {
  transports: ["websocket"],
  path: "/quizPlate/"
});
console.log(socket);
socket.on("connect_error", (data) => {
  console.log("not_connected")
})

socket.on("connect", (data) => {
  console.log("connected")
})


function camData() {
  socket.on("cam", (data) => {
    console.log(data)
  })
}

var serverData = (function () {
  return {
    camData: function () {
      socket.on("cam", (data) => {
        console.log(data)
      })
    }
  }
})(serverData || {})
