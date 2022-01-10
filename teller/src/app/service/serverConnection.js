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

socket.on("quiz", (data) => {
  console.log("quiz is finished " + data);
})

var serverData = (function () {
  return {
    camData: function (x) {
      socket.on("cam", (data) => {
        x(data);
      })
    }
  }
})(serverData || {})
